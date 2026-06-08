import { supabase } from "@/integrations/supabase/client";
import { sendClientConfirmation } from "@/lib/clientEmail";
import type { Lang } from "@/i18n/LanguageContext";

export interface SubmitLeadInput {
  source: "home_cta" | "contacts_form" | "web_development";
  name: string;
  contact: string;
  message?: string;
  lang?: Lang;
}

/**
 * Сохраняет заявку из CTA-формы в БД и отправляет email-уведомление
 * владельцу студии (Prezidenthulk@gmail.com).
 * Email-уведомление не блокирует ответ — ошибки логируются, но не пробрасываются.
 */
export async function submitLead(input: SubmitLeadInput): Promise<void> {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;

  const { error } = await (supabase.from("contact_submissions") as any).insert({
    source: input.source,
    name: input.name,
    contact: input.contact,
    message: input.message ?? null,
    page_url: pageUrl,
    user_agent: userAgent,
  });
  if (error) throw error;

  const lang: Lang = input.lang ?? "ru";
  const trackBySource: Record<SubmitLeadInput["source"], "web" | "general"> = {
    home_cta: "general",
    contacts_form: "general",
    web_development: "web",
  };

  // Уведомление по email — не блокируем UX при ошибке
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "lead-notification",
        recipientEmail: "Prezidenthulk@gmail.com",
        idempotencyKey: `lead-${input.source}-${crypto.randomUUID()}`,
        templateData: {
          source: input.source,
          name: input.name,
          contact: input.contact,
          message: input.message ?? "",
          pageUrl,
          submittedAt: new Date().toLocaleString(lang === "en" ? "en-US" : "ru-RU"),
          formLang: lang,
        },
      },
    });
  } catch (e) {
    console.warn("lead notification failed", e);
  }

  // Авто-подтверждение клиенту (только если контакт — email)
  await sendClientConfirmation({
    contact: input.contact,
    name: input.name,
    lang,
    source: input.source,
    track: trackBySource[input.source],
  });
}
