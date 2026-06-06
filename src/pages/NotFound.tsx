import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { useT } from "@/i18n/translations";

const NotFound = () => {
  const location = useLocation();
  const { lang, lp } = useT();
  const isEn = lang === "en";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title={isEn ? "Page not found — HulkWork Studio" : "Страница не найдена — HulkWork Studio"}
        description={isEn ? "The requested page does not exist. Go back to home or use the menu." : "Запрошенная страница не существует. Вернитесь на главную или воспользуйтесь меню."}
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">{isEn ? "Page not found" : "Страница не найдена"}</p>
          <a href={lp("/")} className="text-primary underline hover:text-primary/90">
            {isEn ? "Back to home" : "Вернуться на главную"}
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
