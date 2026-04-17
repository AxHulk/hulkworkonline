import { Card, CardContent } from "@/components/ui/card";
import aboutTeamAvatars from "@/assets/about_team_avatars.webp";

const team = [
  {
    name: "Алекс",
    role: "Создатель и идейный вдохновитель",
    desc: "Визионер, объединивший таланты под одним брендом. Гений архитектуры цифровых решений и специалист по любому программированию. Задаёт вектор развития студии и лично контролирует ключевые проекты.",
  },
  {
    name: "Натали",
    role: "Дизайнер и 3D-визуализатор",
    desc: "Создаёт визуальные шедевры на стыке эстетики и функциональности. Специализация: UI/UX, фирменный стиль, брендбуки, 3D-визуализация и графические материалы для любых носителей.",
  },
  {
    name: "Александр",
    role: "Эксперт по информационной безопасности",
    desc: "Стоит на страже ваших данных. Сочетает глубокую экспертизу в кибербезопасности с навыками разработки — незаменим при создании систем с высокими требованиями к защите.",
  },
  {
    name: "Евгений",
    role: "Специалист по инновациям",
    desc: "Мультифункциональный разработчик-менеджер, внедряющий передовые технологии. ИИ-интеграции, нестандартные алгоритмы, автоматизация процессов — его стихия.",
  },
];

const TeamSection = () => (
  <section className="bg-secondary/30 py-16 md:py-24">
    <div className="container">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold md:text-4xl">Люди, которые стоят за технологиями</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          За каждым проектом HulkWork Studio стоит конкретный человек с конкретной экспертизой. Мы не нанимаем джунов и не делегируем задачи случайным фрилансерам. Каждый член нашей команды — это проверенный временем профессионал.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <img src={aboutTeamAvatars} alt="Команда HulkWork Studio" className="w-full max-w-2xl" />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((t) => (
          <Card key={t.name} className="transition-shadow hover:shadow-lg hover:-translate-y-1 duration-300">
            <CardContent className="p-5">
              <h3 className="font-heading text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-xs font-medium text-primary">{t.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
