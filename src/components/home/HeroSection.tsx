import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/main_hero.png";

const HeroSection = () => (
  <section
    className="relative min-h-screen overflow-hidden"
    style={{ background: "#FAFAFA" }}
  >
    {/* Hex pattern */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236B2FA0' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />

    <div className="container relative z-10 flex min-h-screen items-center">
      <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Цифровые шедевры, созданные для лидерства.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0 mx-auto">
            Мы не просто пишем код. Мы проектируем логику, имитируем поведение
            и&nbsp;выводим бизнес в&nbsp;топ. От&nbsp;концепции до готового
            продукта — за&nbsp;72&nbsp;часа.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
            <Button
              size="lg"
              className="gap-2 font-heading font-semibold"
              asChild
            >
              <a href="#cta">
                Начать проект <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary/30 font-heading font-semibold text-primary hover:bg-primary/5"
              asChild
            >
              <a
                href="https://t.me/MalHulk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Написать в Telegram
              </a>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 flex justify-center lg:order-2">
          <img
            src={heroImg}
            alt="HulkWork Studio — digital услуги"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
