import { useT } from "@/i18n/translations";
import { useLocation } from "react-router-dom";

interface Props {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: Props) => {
  const { lang, switchTo } = useT();
  const { pathname } = useLocation();
  // RU-only sections (blog, legal). When user is on these and clicks EN,
  // send them to the EN home instead of a non-existent /en/<ru-only> path.
  const ruOnly = /^\/(blog|offer|terms|privacy|unsubscribe)(\/|$)/.test(
    pathname.startsWith("/en/") ? pathname.slice(3) : pathname === "/en" ? "/" : pathname,
  );
  const handleSwitch = (next: "ru" | "en") => {
    if (next === "en" && ruOnly) {
      try { localStorage.setItem("hw_lang", "en"); } catch { /* ignore */ }
      window.location.assign("/en");
      return;
    }
    switchTo(next);
  };
  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-md border text-xs font-heading font-semibold ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => handleSwitch("ru")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "ru"
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:text-primary"
        }`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:text-primary"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
