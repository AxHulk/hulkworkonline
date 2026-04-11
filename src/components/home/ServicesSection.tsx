import { Globe, BarChart3, Search, Megaphone } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Создание сайтов",
    description: "Лендинги, корпоративные сайты и интернет-магазины под ключ. Адаптивный дизайн и быстрая загрузка.",
    price: "от 30 000 ₽",
    href: "/services/web-development",
  },
  {
    icon: BarChart3,
    title: "Поведенческие факторы",
    description: "Улучшение метрик сайта: глубина просмотра, время на сайте, снижение отказов.",
    price: "от 15 000 ₽",
    href: "/services/behavioral-factors",
  },
  {
    icon: Search,
    title: "SEO аналитика",
    description: "Комплексный аудит, семантическое ядро, оптимизация и продвижение в поисковых системах.",
    price: "от 20 000 ₽",
    href: "/services/seo",
  },
  {
    icon: Megaphone,
    title: "SMM продвижение",
    description: "Ведение соцсетей, таргетированная реклама, контент-стратегия и аналитика.",
    price: "от 25 000 ₽",
    href: "/services/smm",
  },
];

const ServicesSection = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Наши услуги</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        Выберите подходящее решение для роста вашего бизнеса в интернете
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card
            key={s.title}
            className="group flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-primary">{s.price}</span>
              <Button size="sm" variant="ghost" asChild>
                <Link to={s.href}>Подробнее</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
