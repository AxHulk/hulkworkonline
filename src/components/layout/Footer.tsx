import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-foreground text-background">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <img src="/logo.png" alt="HulkWork Studio" className="mb-3 h-8 w-auto brightness-0 invert" />
          <p className="text-sm text-background/70">
            Индивидуальный предприниматель Фурса Наталия Николаевна
          </p>
          <ul className="mt-3 space-y-1 text-xs text-background/50">
            <li>ИНН: 910201714510</li>
            <li>ОГРНИП: 322911200005052</li>
            <li>295050, г. Симферополь, ул. Кечкеметская д. 94-А</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Услуги</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/services/web-development" className="hover:text-background">Создание сайтов</Link></li>
            <li><Link to="/services/behavioral-factors" className="hover:text-background">Поведенческие факторы</Link></li>
            <li><Link to="/services/seo" className="hover:text-background">SEO аналитика</Link></li>
            <li><Link to="/services/smm" className="hover:text-background">SMM продвижение</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Документы</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/offer" className="hover:text-background">Публичная оферта</Link></li>
            <li><Link to="/privacy" className="hover:text-background">Политика конфиденциальности</Link></li>
            <li><Link to="/terms" className="hover:text-background">Оплата, возврат и условия услуг</Link></li>
          </ul>
          <h4 className="mb-3 mt-6 font-heading text-sm font-semibold">Ресурсы</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/portfolio" className="hover:text-background">Портфолио</Link></li>
            <li><Link to="/blog" className="hover:text-background">Блог</Link></li>
            <li><Link to="/about" className="hover:text-background">О нас</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Контакты</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>
              <a href="mailto:hello@axhulk.ru" className="hover:text-background">hello@axhulk.ru</a>
            </li>
            <li>
              <a href="tel:+79785400981" className="hover:text-background">+7 (978) 54-00-981</a>
            </li>
            <li>295050, г. Симферополь</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-background/20 pt-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} ИП Фурса Наталия Николаевна. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;
