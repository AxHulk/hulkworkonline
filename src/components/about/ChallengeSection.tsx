import { Palette, Settings, ShoppingCart, FileText, Clock } from "lucide-react";
import aboutChallenge from "@/assets/about_challenge.png";
import { useUsdRubRate, formatPrice } from "@/lib/exchangeRate";
import { useT } from "@/i18n/translations";

const FEATURES_TEXT = {
  ru: [
    "Уникальный логотип и базовый брендбук",
    "Продуманная логика работы сайта и путь клиента",
    "Работоспособная корзина и система заказов",
    "Все необходимые юридические страницы",
    "Полный запуск в течение суток",
  ],
  en: [
    "Unique logo and basic brand book",
    "Thoughtful site logic and customer journey",
    "Working cart and order system",
    "All required legal pages",
    "Full launch within 24 hours",
  ],
};
const FEATURE_ICONS = [Palette, Settings, ShoppingCart, FileText, Clock];

const ChallengeSection = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const rate = useUsdRubRate();
  const price = formatPrice(500, lang, rate);
  const features = FEATURES_TEXT[lang].map((text, i) => ({ icon: FEATURE_ICONS[i], text }));
  return (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-4xl">{isEn ? "We love a challenge" : "Мы любим вызовы"}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {isEn
              ? <>Words are good. Numbers are better. We can build a full product from scratch <strong className="text-foreground">in 24 hours</strong>. For a starting price of <strong className="text-foreground">{price}</strong> you get not a template or a draft — but a ready business tool:</>
              : <>Слова — это хорошо. Конкретные цифры — лучше. Мы способны создать полноценный ресурс с нуля <strong className="text-foreground">в течение суток</strong>. За стартовую сумму в <strong className="text-foreground">{price}</strong> вы получаете не шаблон и не заготовку, а готовый бизнес-инструмент:</>}
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
            {isEn ? "Remember: everything that seems impossible to you, we built yesterday." : "Помните: всё, что кажется вам невозможным, мы делали ещё вчера."}
          </blockquote>
        </div>
        <div className="flex justify-center">
          <img src={aboutChallenge} alt={isEn ? `Challenge ${price} — full launch in 24 hours` : `Вызов ${price} — полный запуск за сутки`} className="w-full max-w-md" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default ChallengeSection;
