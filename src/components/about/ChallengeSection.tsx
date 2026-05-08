import { Palette, Settings, ShoppingCart, FileText, Clock } from "lucide-react";
import aboutChallenge from "@/assets/about_challenge.png";
import { useUsdRubRate, formatRub } from "@/lib/exchangeRate";

const features = [
  { icon: Palette, text: "Уникальный логотип и базовый брендбук" },
  { icon: Settings, text: "Продуманная логика работы сайта и путь клиента" },
  { icon: ShoppingCart, text: "Работоспособная корзина и система заказов" },
  { icon: FileText, text: "Все необходимые юридические страницы" },
  { icon: Clock, text: "Полный запуск в течение суток" },
];

const ChallengeSection = () => {
  const rate = useUsdRubRate();
  return (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-4xl">Мы любим вызовы</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Слова — это хорошо. Конкретные цифры — лучше. Мы способны создать полноценный ресурс с нуля <strong className="text-foreground">в течение суток</strong>. За стартовую сумму в <strong className="text-foreground">{formatRub(500, rate)}</strong> вы получаете не шаблон и не заготовку, а готовый бизнес-инструмент:
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed pt-1">{f.text}</span>
              </li>
            ))}
          </ul>
          <blockquote className="mt-6 border-l-4 border-primary bg-primary/5 py-3 pl-4 pr-4 text-sm italic text-muted-foreground rounded-r-lg">
            Помните: всё, что кажется вам невозможным, мы делали ещё вчера.
          </blockquote>
        </div>
        <div className="flex justify-center">
          <img src={aboutChallenge} alt={`Вызов ${formatRub(500, rate)} — полный запуск за сутки`} className="w-full max-w-md" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default ChallengeSection;
