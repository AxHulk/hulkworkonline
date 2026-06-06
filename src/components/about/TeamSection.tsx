import { Card, CardContent } from "@/components/ui/card";
import aboutTeamAvatars from "@/assets/about_team_avatars.png";
import { useT } from "@/i18n/translations";

const TEAM_TEXT = {
  ru: [
    { name: "Алекс", role: "Создатель и идейный вдохновитель", desc: "Визионер, объединивший таланты под одним брендом. Гений архитектуры цифровых решений и специалист по любому программированию. Задаёт вектор развития студии и лично контролирует ключевые проекты." },
    { name: "Натали", role: "Дизайнер и 3D-визуализатор", desc: "Создаёт визуальные шедевры на стыке эстетики и функциональности. Специализация: UI/UX, фирменный стиль, брендбуки, 3D-визуализация и графические материалы для любых носителей." },
    { name: "Александр", role: "Эксперт по информационной безопасности", desc: "Стоит на страже ваших данных. Сочетает глубокую экспертизу в кибербезопасности с навыками разработки — незаменим при создании систем с высокими требованиями к защите." },
    { name: "Евгений", role: "Специалист по инновациям", desc: "Мультифункциональный разработчик-менеджер, внедряющий передовые технологии. ИИ-интеграции, нестандартные алгоритмы, автоматизация процессов — его стихия." },
  ],
  en: [
    { name: "Alex", role: "Founder & visionary", desc: "The visionary who united talents under one brand. Genius of digital architecture and a programming polymath. Sets the studio's direction and personally oversees key projects." },
    { name: "Natalie", role: "Designer & 3D visualizer", desc: "Creates visual masterpieces at the intersection of aesthetics and function. Specialty: UI/UX, brand identity, brand books, 3D visualization and graphics for any medium." },
    { name: "Alexander", role: "Security expert", desc: "Guarding your data. Combines deep cybersecurity expertise with development skills — indispensable for systems with high security demands." },
    { name: "Eugene", role: "Innovation specialist", desc: "A multi-skilled developer-manager bringing in cutting-edge tech. AI integrations, non-standard algorithms, process automation — his domain." },
  ],
};

const TeamSection = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const team = TEAM_TEXT[lang];
  return (
  <section className="bg-secondary/30 py-16 md:py-24">
    <div className="container">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold md:text-4xl">{isEn ? "The people behind the technology" : "Люди, которые стоят за технологиями"}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          {isEn
            ? "Behind every HulkWork Studio project is a specific person with specific expertise. We don't hire juniors or delegate to random freelancers. Every team member is a time-tested professional."
            : "За каждым проектом HulkWork Studio стоит конкретный человек с конкретной экспертизой. Мы не нанимаем джунов и не делегируем задачи случайным фрилансерам. Каждый член нашей команды — это проверенный временем профессионал."}
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <img src={aboutTeamAvatars} alt={isEn ? "HulkWork Studio team" : "Команда HulkWork Studio"} className="w-full max-w-2xl" />
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
};

export default TeamSection;
