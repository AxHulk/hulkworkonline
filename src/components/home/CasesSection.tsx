import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cases = [
  {
    title: "Интернет-магазин TechStore",
    category: "Веб-разработка",
    description: "Разработка интернет-магазина электроники с каталогом на 5000+ товаров.",
    result: "+180% конверсии",
  },
  {
    title: "SEO для клиники «Здоровье»",
    category: "SEO",
    description: "Комплексное продвижение медицинского центра в ТОП-3 Яндекса.",
    result: "+350% органического трафика",
  },
  {
    title: "SMM для ресторана «Вкусно»",
    category: "SMM",
    description: "Стратегия продвижения в Instagram и VK с нуля до 50K подписчиков.",
    result: "50K подписчиков за 6 мес.",
  },
  {
    title: "ПФ для агентства недвижимости",
    category: "Поведенческие факторы",
    description: "Улучшение поведенческих метрик сайта для выхода из-под фильтров.",
    result: "–60% отказов",
  },
];

const CasesSection = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Избранные кейсы</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        Результаты, которыми мы гордимся
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {cases.map((c) => (
          <Card key={c.title} className="transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">{c.category}</Badge>
              <h3 className="font-heading text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-3 font-heading text-sm font-bold text-primary">{c.result}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default CasesSection;
