import { useEffect, useState } from "react";
import { Megaphone, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "./QuizContext";
import { useLanguage } from "@/i18n/LanguageContext";

const SESSION_KEY = "hw_marketing_invite_shown";

/**
 * Промо-баннер, приглашающий пройти опросник по маркетингу/SMM.
 * Появляется через 5 секунд или при скролле >40% страницы.
 * Показывается один раз за сессию.
 */
const MarketingInviteBanner = () => {
  const { openQuiz, open } = useQuiz();
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let shown = false;
    const trigger = () => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(true);
      cleanup();
    };

    const timer = window.setTimeout(trigger, 5000);
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total > 0.4) trigger();
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, []);

  if (!visible || open) return null;

  return (
    <div
      role="dialog"
      aria-label={isEn ? "Marketing quiz — we'll build a strategy for your business" : "Опросник по маркетингу — соберём стратегию под ваш бизнес"}
      className="fixed bottom-4 left-1/2 z-40 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background to-accent/30 p-5 shadow-2xl animate-in slide-in-from-bottom-4 fade-in">
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={isEn ? "Close" : "Закрыть"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <p className="font-heading text-base font-bold leading-tight text-foreground">
              {isEn ? "We'll build a strategy for your business" : "Соберём стратегию под ваш бизнес"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isEn ? (
                <>Answer a few short questions and we'll suggest a <strong className="text-foreground">marketing plan</strong> tailored to your niche and budget.</>
              ) : (
                <>Ответьте на короткие вопросы — и мы предложим <strong className="text-foreground">маркетинговый план</strong>, который подходит именно вашей нише и бюджету.</>
              )}
            </p>
          </div>
        </div>

        <Button
          onClick={() => { setVisible(false); openQuiz("smm_invite_banner", "marketing"); }}
          className="mt-4 w-full gap-2 font-heading font-semibold"
        >
          {isEn ? "Take the quiz" : "Пройти опрос"} <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          {isEn ? "≈ 3 minutes · personal offer" : "≈ 3 минуты · персональное предложение"}
        </p>
      </div>
    </div>
  );
};

export default MarketingInviteBanner;