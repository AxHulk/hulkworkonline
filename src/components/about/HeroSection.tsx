import aboutHero from "@/assets/about_hero.png";
import { useT } from "@/i18n/translations";

const HeroSection = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  return (
  <section className="relative overflow-hidden bg-[#1A0A2E] py-20 md:py-28">
    <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white md:text-5xl leading-tight">
          {isEn ? <>HulkWork Studio:<br />Building the impossible.<br />Yesterday.</> : <>HulkWork Studio:<br />Создаём невозможное.<br />Ещё вчера.</>}
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
          {isEn
            ? "We're a team of time-tested specialists, code and design geniuses united under one brand with a single goal: turning bold ideas into working digital masterpieces. Our strength is the synergy of deep expertise and unlimited interaction with modern tech."
            : "Мы — объединение проверенных временем специалистов, гениев кода и дизайна, собравшихся под одним брендом с единственной целью: превращать смелые идеи в работающие цифровые шедевры. Наша сила — в синергии глубокой экспертизы и безграничного взаимодействия с современными технологиями."}
        </p>
        <p className="mt-3 max-w-xl text-sm text-white/50 leading-relaxed">
          {isEn
            ? "We don't just build websites and promote brands — we create tools that work for your business every second."
            : "Мы не просто разрабатываем сайты и продвигаем бренды — мы создаём инструменты, которые работают на ваш бизнес каждую секунду."}
        </p>
      </div>
      <div className="flex justify-center">
        <img src={aboutHero} alt={isEn ? "HulkWork Studio — tech crystal" : "HulkWork Studio — кристалл технологий"} className="w-full max-w-lg rounded-2xl" />
      </div>
    </div>
    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
  </section>
  );
};

export default HeroSection;
