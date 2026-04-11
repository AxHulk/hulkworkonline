import { Shield, Clock, Users, Zap, HeadphonesIcon, TrendingUp } from "lucide-react";

const advantages = [
  { icon: Shield, title: "Гарантия качества", text: "Каждый проект проходит проверку перед сдачей" },
  { icon: Clock, title: "Точные сроки", text: "Выполняем работу в оговорённые дедлайны" },
  { icon: Users, title: "Команда экспертов", text: "Проверенные специалисты с опытом от 5 лет" },
  { icon: Zap, title: "Быстрый старт", text: "Начинаем работу в течение 24 часов после заявки" },
  { icon: HeadphonesIcon, title: "Поддержка 24/7", text: "Всегда на связи для решения ваших задач" },
  { icon: TrendingUp, title: "Результат", text: "Ориентированы на рост ваших бизнес-показателей" },
];

const AdvantagesSection = () => (
  <section className="bg-secondary py-16 md:py-24">
    <div className="container">
      <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Почему мы</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        6 причин доверить ваш проект HulkWork Studio
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((a) => (
          <div key={a.title} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <a.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AdvantagesSection;
