import { Link } from "react-router-dom";
import { useT } from "@/i18n/translations";

const Footer = () => {
  const { t, lang, lp } = useT();
  const isEn = lang === "en";
  return (
  <footer className="border-t bg-foreground text-background">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <img src="/logo.png" alt="HulkWork Studio" className="mb-3 h-8 w-auto brightness-0 invert" />
          <p className="text-sm text-background/70">
            {t("footer.about")}
          </p>
          {!isEn && (
            <ul className="mt-3 space-y-1 text-xs text-background/50">
              <li>ИНН: 910201714510</li>
              <li>ОГРНИП: 322911200005052</li>
              <li>295050, г. Симферополь, ул. Кечкеметская д. 94-А</li>
            </ul>
          )}
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">{t("footer.services")}</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to={lp("/services/web-development")} className="hover:text-background">{t("header.service.webDev")}</Link></li>
            <li><Link to={lp("/services/behavioral-factors")} className="hover:text-background">{t("header.service.behavioral")}</Link></li>
            <li><Link to={lp("/services/seo")} className="hover:text-background">{t("footer.serviceSeo")}</Link></li>
            <li><Link to={lp("/services/smm")} className="hover:text-background">{t("footer.serviceSmm")}</Link></li>
          </ul>
        </div>

        {/* Legal + Resources */}
        <div>
          {!isEn && (
            <>
              <h4 className="mb-3 font-heading text-sm font-semibold">{t("footer.legal")}</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link to="/offer" className="hover:text-background">{t("footer.offer")}</Link></li>
                <li><Link to="/privacy" className="hover:text-background">{t("footer.privacy")}</Link></li>
                <li><Link to="/terms" className="hover:text-background">{t("footer.terms")}</Link></li>
              </ul>
            </>
          )}
          <h4 className={`mb-3 ${isEn ? "" : "mt-6"} font-heading text-sm font-semibold`}>{t("footer.resources")}</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to={lp("/portfolio")} className="hover:text-background">{t("header.portfolio")}</Link></li>
            {!isEn && <li><Link to="/blog" className="hover:text-background">{t("header.blog")}</Link></li>}
            <li><Link to={lp("/about")} className="hover:text-background">{t("header.about")}</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">{t("footer.contacts")}</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>
              <a href="mailto:hello@axhulk.ru" className="hover:text-background">hello@axhulk.ru</a>
            </li>
            <li>
              <a href="tel:+79785400981" className="hover:text-background">+7 (978) 54-00-981</a>
            </li>
            {!isEn && <li>295050, г. Симферополь</li>}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-background/20 pt-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
