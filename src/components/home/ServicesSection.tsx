import { Monitor, MousePointerClick, SearchCheck, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Monitor,
    title: "Создание сайтов",
    description:
      "Современные технологии, ИИ-интеграции (ChatGPT, Claude, Manus, Grok), любые базы данных, магазины, личные кабинеты и безупречная логика пути клиента.",
    price: "от $500 · от 5 часов",
    href: "/services/web-development",
    linkText: "Подробнее об услуге →",
  },
  {
    icon: MousePointerClick,
    title: "Поведенческие факторы",
    description:
      "Уникальная технология имитации поведенческих факторов на собственном коде. Ежедневная работа, высокие нагрузки, полное прохождение проверок GA и Метрики.",
    price: "от $400/месяц",
    href: "/services/behavioral-factors",
    linkText: "Узнать как это работает →",
  },
  {
    icon: SearchCheck,
    title: "SEO Аналитика и настройка",
    description:
      "Технический аудит, написание уникальных SEO-статей, подготовка аккаунтов для Яндекс Директ и РСЯ. Комплексный подход к органическому росту.",
    price: "по запросу",
    href: "/services/seo",
    linkText: "Изучить подход →",
  },
  {
    icon: Megaphone,
    title: "SMM Продвижение",
    description:
      "Покупка групп ВКонтакте и Telegram с историей, профессиональное оформление, контент-план и ведение. Ваш бренд — живой и узнаваемый.",
    price: "от $250 за 2 месяца",
    href: "/services/smm",
    linkText: "Посмотреть пакеты →",
  },
];

const ServicesSection = () => (
  <section className="bg-background py-20 md:py-28">
    <div className="container">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
        Что мы создаём
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card
            key={s.title}
            className="group flex flex-col border-2 border-transparent bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <CardContent className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <p className="mt-4 font-heading text-sm font-bold text-primary">
                {s.price}
              </p>
              <Link
                to={s.href}
                className="mt-3 text-sm font-medium text-primary/80 transition-colors hover:text-primary"
              >
                {s.linkText}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
