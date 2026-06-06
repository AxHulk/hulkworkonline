import { useT } from "@/i18n/translations";

interface Props {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: Props) => {
  const { lang, switchTo } = useT();
  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-md border text-xs font-heading font-semibold ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => switchTo("ru")}
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
        onClick={() => switchTo("en")}
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
