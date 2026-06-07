import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const COOKIE_KEY = "hulkwork_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const { lang, lp } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm p-4 shadow-lg">
      <div className="container mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-3xl">
          {isEn ? (
            <>
              Our website uses cookies and similar technologies to personalize content, analyze traffic and ensure the
              technical functionality of the interface. By continuing to use the site you consent to the processing of
              these files in accordance with our{" "}
              <Link to={lp("/privacy")} className="text-primary underline hover:text-primary/80">
                Privacy Policy
              </Link>
              . You can disable cookies in your browser settings.
            </>
          ) : (
            <>
              Уважаемый посетитель, наш сайт использует файлы cookie и схожие технологии (метрические системы) для
              персонализации контента, анализа трафика и обеспечения технической работоспособности интерфейса.
              Продолжая использовать сайт, вы даете свое согласие на обработку данных файлов в строгом соответствии с
              нашей{" "}
              <Link to="/privacy" className="text-primary underline hover:text-primary/80">
                Политикой конфиденциальности
              </Link>
              . Вы имеете право отключить использование cookie в настройках вашего веб-браузера.
            </>
          )}
        </p>
        <Button onClick={accept} size="sm" className="shrink-0">
          {isEn ? "Accept" : "Принимаю"}
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
