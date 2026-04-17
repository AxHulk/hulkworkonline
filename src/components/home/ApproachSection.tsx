import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import approachImg from "@/assets/main_approach.png";

const ApproachSection = () => (
  <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#1A0A2E" }}>
    {/* Decorative blur */}
    <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

    <div className="container relative z-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={approachImg}
            alt="Наш подход — прямой путь к результату"
            className="w-full max-w-lg rounded-2xl"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Платите за результат, а&nbsp;не&nbsp;за наши расходы.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            Уникальность нашей бизнес-модели — максимальная
            клиентоориентированность. Вам не нужно оплачивать аренду офиса или
            кофе-брейки менеджеров. Вы платите только за услуги и время того
            специалиста, который нужен вашему проекту.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            Благодаря автоматизации рутины и глубокому взаимодействию с
            технологиями, мы способны создать полноценный ресурс с логотипом,
            брендбуком и логикой всего за&nbsp;сутки.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold text-white transition-colors hover:text-accent"
          >
            Познакомиться с командой <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ApproachSection;
