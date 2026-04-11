const stats = [
  { value: "200+", label: "Проектов выполнено" },
  { value: "150+", label: "Довольных клиентов" },
  { value: "7 лет", label: "Опыт работы" },
  { value: "15", label: "Специалистов в команде" },
];

const TrustSection = () => (
  <section className="bg-primary py-16 md:py-20">
    <div className="container">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-primary-foreground/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
