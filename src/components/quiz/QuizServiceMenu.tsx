import { Sparkles, Globe, Search, Activity, Megaphone, ChevronDown } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuiz } from "./QuizContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props extends Omit<ButtonProps, "onClick"> {
  source: string;
  label?: string;
}

const QuizServiceMenu = ({
  source,
  label,
  className,
  ...rest
}: Props) => {
  const { openQuiz } = useQuiz();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const resolvedLabel = label ?? (isEn ? "Get price in 2 min" : "Узнать цену за 2 мин");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className={cn("gap-2 font-heading font-semibold", className)}
          {...rest}
        >
          <Sparkles className="h-4 w-4" />
          {resolvedLabel}
          <ChevronDown className="h-3.5 w-3.5 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => openQuiz(`${source}_website`, "website")}
          className="gap-2"
        >
          <Globe className="h-4 w-4 text-primary" />
          <span>{isEn ? "Build a website" : "Создать сайт"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openQuiz(`${source}_seo`, "seo")}
          className="gap-2"
        >
          <Search className="h-4 w-4 text-primary" />
          <span>{isEn ? "SEO promotion" : "SEO-продвижение"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openQuiz(`${source}_behavioral`, "seo")}
          className="gap-2"
        >
          <Activity className="h-4 w-4 text-primary" />
          <span>{isEn ? "Behavioral factors" : "Поведенческие факторы"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openQuiz(`${source}_marketing`, "marketing")}
          className="gap-2"
        >
          <Megaphone className="h-4 w-4 text-primary" />
          <span>{isEn ? "Marketing & SMM" : "Маркетинг и SMM"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuizServiceMenu;