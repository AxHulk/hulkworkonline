import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-foreground text-background">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <img src="/logo.png" alt="HulkWork Studio" className="mb-3 h-8 w-auto brightness-0 invert" />
          <p className="text-sm text-background/70">
            Объединяем лучших фрилансеров для комплексного продвижения вашего бизнеса в интернете.
          </p>
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

        {/* Resources */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Ресурсы</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/portfolio" className="hover:text-background">Портфолио</Link></li>
            <li><Link to="/blog" className="hover:text-background">Блог</Link></li>
            <li><Link to="/about" className="hover:text-background">О нас</Link></li>
            <li><Link to="/offer" className="hover:text-background">Публичная оферта</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Контакты</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>info@hulkwork.studio</li>
            <li>+7 (999) 123-45-67</li>
            <li>Москва, Россия</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-background/20 pt-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} HulkWork Studio. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;
