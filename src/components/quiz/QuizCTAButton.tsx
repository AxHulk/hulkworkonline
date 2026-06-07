import { Sparkles } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useQuiz, QuizTrack } from "./QuizContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props extends ButtonProps {
  source: string;
  label?: string;
  track?: QuizTrack;
}

const QuizCTAButton = ({ source, label, track = "website", className, ...rest }: Props) => {
  const { openQuiz } = useQuiz();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const resolvedLabel = label ?? (isEn ? "Get price in 2 min" : "Узнать цену за 2 мин");
  return (
    <Button
      type="button"
      onClick={() => openQuiz(source, track)}
      className={cn("gap-2 font-heading font-semibold", className)}
      {...rest}
    >
      <Sparkles className="h-4 w-4" />
      {resolvedLabel}
    </Button>
  );
};

export default QuizCTAButton;