import { createContext, ReactNode, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Lang = "ru" | "en";

interface LanguageContextValue {
  lang: Lang;
  /** Prefix internal path with /en when current language is English. */
  lp: (path: string) => string;
  switchTo: (next: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLang(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

function stripLangPrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = detectLang(location.pathname);

  const value = useMemo<LanguageContextValue>(() => {
    const lp = (path: string) => {
      if (!path.startsWith("/")) return path;
      if (lang !== "en") return path;
      if (path === "/") return "/en";
      return `/en${path}`;
    };
    const switchTo = (next: Lang) => {
      const base = stripLangPrefix(location.pathname);
      const target = next === "en" ? (base === "/" ? "/en" : `/en${base}`) : base;
      try {
        localStorage.setItem("hw_lang", next);
      } catch {
        /* ignore */
      }
      navigate(target + location.search + location.hash);
    };
    return { lang, lp, switchTo };
  }, [lang, location.pathname, location.search, location.hash, navigate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe default if used outside provider (SSR or tests)
    return { lang: "ru", lp: (p) => p, switchTo: () => {} };
  }
  return ctx;
}
