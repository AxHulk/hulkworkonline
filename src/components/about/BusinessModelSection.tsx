import { Check, X } from "lucide-react";
import aboutBusinessModel from "@/assets/about_business_model.png";

const comparisons = [
  { traditional: "Вы оплачиваете аренду офиса", hulkwork: "Только время специалиста" },
  { traditional: "Вы оплачиваете простои команды", hulkwork: "Только реальная работа" },
  { traditional: "Вы оплачиваете административный штат", hulkwork: "Только нужные эксперты" },
  { traditional: "Непрозрачное ценообразование", hulkwork: "Полная прозрачность" },
];

const BusinessModelSection = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-4xl">Вы платите только за результат</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Уникальность нашей бизнес-модели — в максимальной клиентоориентированности и полной прозрачности. Работая с HulkWork Studio, вам не придётся оплачивать аренду офиса, содержание административного персонала, корпоративный кофе или простои между проектами.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Вы платите исключительно за <strong className="text-foreground">услуги и время того конкретного специалиста</strong>, который необходим вашему проекту прямо сейчас. Никаких скрытых наценок, никакого раздутого прайса.
          </p>
        </div>
        <div className="flex justify-center">
          <img src={aboutBusinessModel} alt="Бизнес-модель HulkWork" className="w-full max-w-md" />
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

export default BusinessModelSection;
