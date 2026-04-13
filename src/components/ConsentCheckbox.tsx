import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { CONSENT_TEXT } from "@/lib/consent";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
}

const ConsentCheckbox = ({ checked, onChange, error }: Props) => (
  <div className="flex items-start gap-3">
    <Checkbox
      id="consent"
      checked={checked}
      onCheckedChange={(v) => onChange(v === true)}
      className={error ? "border-red-500" : ""}
    />
    <label htmlFor="consent" className={`text-xs leading-relaxed ${error ? "text-red-500" : "text-muted-foreground"}`}>
      {CONSENT_TEXT.replace("Политики конфиденциальности", "")}{" "}
      <Link to="/privacy" className="text-primary underline hover:text-primary/80">
        Политики конфиденциальности
      </Link>
    </label>
  </div>
);

export default ConsentCheckbox;
