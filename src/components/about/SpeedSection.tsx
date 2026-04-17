import { Zap } from "lucide-react";
import aboutSpeed from "@/assets/about_speed.webp";

const SpeedSection = () => (
  <section className="bg-secondary/30 py-16 md:py-24">
    <div className="container">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img src={aboutSpeed} alt="Скорость работы HulkWork" className="w-full max-w-md" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-4xl">
            Шедевр за 5 часов?<br />Это не маркетинг — это наша реальность.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Мы тщательно и индивидуально подходим к каждому клиенту. Но при этом, благодаря глубокой автоматизации всех бизнес-процессов, устранению рутины и нашему <strong className="text-foreground">«божественному взаимодействию с технологиями»</strong>, мы работаем с беспрецедентной скоростью.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Простые проекты — лендинги, визитки, небольшие корпоративные сайты — мы создаём <strong className="text-foreground">от 5 часов</strong>. В среднем наши заказчики получают полностью готовый и рабочий ресурс <strong className="text-foreground">за 72 часа</strong>.
          </p>
          <blockquote className="mt-6 border-l-4 border-primary bg-primary/5 py-3 pl-4 pr-4 text-sm italic text-muted-foreground rounded-r-lg">
            <Zap className="mb-1 inline h-4 w-4 text-primary" />{" "}
            Дорого? Нет. Цены HulkWork Studio очень лояльны, потому что всё рассчитано, автоматизировано и готово создавать шедевры для вас.
          </blockquote>
        </div>
      </div>
    </div>
  </section>
);

export default SpeedSection;
