import { Check, X } from "lucide-react";
import aboutBusinessModel from "@/assets/about_business_model.png";
import { useT } from "@/i18n/translations";

const COMPARISONS = {
  ru: [
    { traditional: "Вы оплачиваете аренду офиса", hulkwork: "Только время специалиста" },
    { traditional: "Вы оплачиваете простои команды", hulkwork: "Только реальная работа" },
    { traditional: "Вы оплачиваете административный штат", hulkwork: "Только нужные эксперты" },
    { traditional: "Непрозрачное ценообразование", hulkwork: "Полная прозрачность" },
  ],
  en: [
    { traditional: "You pay for office rent", hulkwork: "Only specialist time" },
    { traditional: "You pay for team downtime", hulkwork: "Only real work" },
    { traditional: "You pay for admin staff", hulkwork: "Only the experts you need" },
    { traditional: "Opaque pricing", hulkwork: "Full transparency" },
  ],
};

const BusinessModelSection = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const comparisons = COMPARISONS[lang];
  return (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-4xl">{isEn ? "You only pay for results" : "Вы платите только за результат"}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {isEn
              ? "Our model's uniqueness is maximum client focus and full transparency. Working with HulkWork Studio, you won't pay for office rent, admin staff, corporate coffee or downtime between projects."
              : "Уникальность нашей бизнес-модели — в максимальной клиентоориентированности и полной прозрачности. Работая с HulkWork Studio, вам не придётся оплачивать аренду офиса, содержание административного персонала, корпоративный кофе или простои между проектами."}
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {isEn
              ? <>You pay exclusively for <strong className="text-foreground">services and time of the specific specialist</strong> your project needs right now. No hidden markups, no inflated pricing.</>
              : <>Вы платите исключительно за <strong className="text-foreground">услуги и время того конкретного специалиста</strong>, который необходим вашему проекту прямо сейчас. Никаких скрытых наценок, никакого раздутого прайса.</>}
          </p>
        </div>
        <div className="flex justify-center">
          <img src={aboutBusinessModel} alt={isEn ? "HulkWork business model" : "Бизнес-модель HulkWork"} className="w-full max-w-md" />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {comparisons.map((c, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground">{c.traditional}</span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">{c.hulkwork}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default BusinessModelSection;
