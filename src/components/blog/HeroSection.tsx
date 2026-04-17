import blogHero from "@/assets/blog_hero.webp";

const BlogHeroSection = () => (
  <section className="relative overflow-hidden bg-[#1A0A2E] py-20 md:py-28">
    <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white md:text-5xl leading-tight">
          Инсайты. Аналитика.<br />Экспертиза.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
          В блоге мы собрали не просто сгенерированный контент, а вручную выбранные статьи, 
          новости и исследования, актуальные на 2026 год. Мы провели глубокий фактчекинг, 
          а также поделились своим уникальным видением в разделах, необходимых для премиального 
          присутствия бренда на рынке.
        </p>
        <p className="mt-3 max-w-xl text-sm text-white/50 leading-relaxed">
          Вы можете саморазвиваться по данным материалам, использовать их для самостоятельного 
          продвижения или сверять лучшие практики с вашим заказом услуг у нас. 
          Мы открываем свои карты, потому что настоящая экспертность не боится прозрачности.
        </p>
      </div>
      <div className="flex justify-center">
        <img src={blogHero} alt="Блог HulkWork Studio" className="w-full max-w-lg rounded-2xl" />
      </div>
    </div>
    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
  </section>
);

export default BlogHeroSection;
