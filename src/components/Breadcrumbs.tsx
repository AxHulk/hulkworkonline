import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/translations";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "light" | "dark";
}

const Breadcrumbs = ({ items, className, variant = "light" }: BreadcrumbsProps) => {
  const isDark = variant === "dark";
  const baseText = isDark ? "text-white/60" : "text-muted-foreground";
  const hoverText = isDark ? "hover:text-white" : "hover:text-foreground";
  const currentText = isDark ? "text-white" : "text-foreground";
  const { lang, lp } = useT();
  const isEn = lang === "en";

  return (
    <nav
      aria-label={isEn ? "Breadcrumbs" : "Хлебные крошки"}
      className={cn("flex items-center text-xs sm:text-sm", baseText, className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center">
          <Link to={lp("/")} className={cn("flex items-center gap-1 transition-colors", hoverText)}>
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">{isEn ? "Home" : "Главная"}</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              {isLast || !item.url ? (
                <span className={cn("font-medium", currentText)} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className={cn("transition-colors", hoverText)}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
