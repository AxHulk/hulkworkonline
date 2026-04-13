import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "PayCross",
    category: "Платёжный сервис / Веб",
    description: "Мультивалютная платёжная система с интеграцией криптовалют и фиатных шлюзов.",
  },
  {
    title: "HulkWork Studio",
    category: "Сайт-магазин услуг / Веб",
    description: "Корпоративный сайт студии с блогом, портфолио и системой заявок.",
  },
  {
    title: "Бот ПФ (Open Source)",
    category: "Поведенческие факторы",
    description: "Автоматизация накрутки поведенческих факторов на собственном коде.",
  },
  {
    title: "Kvanteks",
    category: "Сайт-визитка / Веб",
    description: "Лаконичный сайт для текстильного производства с каталогом продукции.",
  },
  {
    title: "SMM ВКонтакте",
    category: "Упаковка и ведение",
    description: "Полная упаковка и контент-стратегия для группы ВКонтакте с нуля.",
  },
];

const PortfolioSection = () => (
  <section
    className="relative overflow-hidden py-20 md:py-28"
    style={{ background: "#FAFAFA" }}
  >
    {/* Hex pattern */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236B2FA0' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />

    <div className="container relative z-10">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
        Наша гордость. Ваша уверенность.
      </h2>

      {/* Horizontal scroll */}
      <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
        <div className="flex gap-6" style={{ minWidth: "max-content" }}>
          {projects.map((p) => (
            <Card
              key={p.title}
              className="w-72 shrink-0 border bg-background transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {p.category}
                </Badge>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2 font-heading font-semibold" asChild>
          <Link to="/portfolio">
            Смотреть все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default PortfolioSection;
