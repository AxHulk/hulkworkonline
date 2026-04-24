import { Sparkles } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useQuiz, QuizTrack } from "./QuizContext";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  source: string;
  label?: string;
  track?: QuizTrack;
}

const QuizCTAButton = ({ source, label = "Узнать цену за 2 мин", track = "website", className, ...rest }: Props) => {
  const { openQuiz } = useQuiz();
  return (
    <Button
      type="button"
      onClick={() => openQuiz(source, track)}
      className={cn("gap-2 font-heading font-semibold", className)}
      {...rest}
    >
      <Sparkles className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default QuizCTAButton;