import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useT } from "@/i18n/translations";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
}

const ConsentCheckbox = ({ checked, onChange, error }: Props) => {
  const { t, lang } = useT();
  return (
  <div className="flex items-start gap-3">
    <Checkbox
      id="consent"
      checked={checked}
      onCheckedChange={(v) => onChange(v === true)}
      className={error ? "border-red-500" : ""}
    />
    <label htmlFor="consent" className={`text-xs leading-relaxed ${error ? "text-red-500" : "text-muted-foreground"}`}>
      {t("consent.text")}
      {lang === "ru" ? (
        <Link to="/privacy" className="text-primary underline hover:text-primary/80">
          {t("consent.policy")}
        </Link>
      ) : (
        <span className="text-primary">{t("consent.policy")}</span>
      )}
    </label>
  </div>
  );
};

export default ConsentCheckbox;
