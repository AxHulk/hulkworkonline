import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/LanguageContext";

/**
 * Простая проверка, что строка похожа на email.
 * Используется, чтобы решить, отправлять ли клиенту авто-подтверждение
 * (в Telegram-логине авто-ответ по email не имеет смысла).
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string | undefined | null): boolean {
  if (!value) return false;
  return EMAIL_RE.test(value.trim());
}

export interface SendClientConfirmationInput {
  contact: string;
  name: string;
  lang: Lang;
  source: string;
  track?: "web" | "seo" | "smm" | "behavioral" | "general";
  idempotencyKey?: string;
}

/**
 * Отправляет клиенту автоматическое подтверждение получения заявки.
 * Письмо уходит только если `contact` — это email. Ошибки логируются,
 * но не пробрасываются, чтобы не ломать UX отправки заявки.
 */
export async function sendClientConfirmation(
  input: SendClientConfirmationInput,
): Promise<void> {
  const email = input.contact?.trim();
  if (!isEmail(email)) return;

  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "client-confirmation",
        recipientEmail: email,
        idempotencyKey:
          input.idempotencyKey ??
          `client-confirm-${input.source}-${crypto.randomUUID()}`,
        templateData: {
          name: input.name,
          formLang: input.lang,
          track: input.track ?? "general",
        },
      },
    });
  } catch (e) {
    console.warn("client confirmation email failed", e);
  }
}