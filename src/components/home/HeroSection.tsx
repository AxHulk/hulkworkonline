import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-primary py-20 md:py-32">
    {/* Background pattern */}
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, hsl(272 60% 82%) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
    <div className="container relative z-10 text-center">
      <h1 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
        Комплексные digital-услуги для вашего бизнеса
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
        Создаём сайты, продвигаем в поиске и соцсетях, улучшаем поведенческие факторы — всё в одном месте от команды проверенных специалистов.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button
          size="lg"
          variant="secondary"
          className="gap-2 font-heading font-semibold"
          asChild
        >
          <Link to="/services">
            Смотреть услуги <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground/30 font-heading font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          asChild
        >
          <a href="#cta">Оставить заявку</a>
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
