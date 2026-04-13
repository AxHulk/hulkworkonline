import { supabase } from "@/integrations/supabase/client";

const CONSENT_TEXT =
  "Я свободно, своей волей и в своем интересе даю конкретное, информированное и сознательное согласие на обработку моих персональных данных и полностью принимаю условия Политики конфиденциальности";

export { CONSENT_TEXT };

export async function logConsent(formType: string) {
  try {
    // Get IP via public API
    let ip = "unknown";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip;
    } catch {
      // silently fail
    }

    await supabase.from("consent_logs").insert({
      ip_address: ip,
      form_type: formType,
      consent_text: CONSENT_TEXT,
      user_agent: navigator.userAgent,
    });
  } catch {
    // non-blocking
  }
}
