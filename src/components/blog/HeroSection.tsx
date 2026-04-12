import blogHero from "@/assets/blog_hero.png";

const BlogHeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={blogHero} alt="Блог HulkWork Studio" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
    </div>
    <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
      <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        Инсайты. Аналитика. Экспертиза.
      </h1>
      <p className="max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
        В блоге мы собрали не просто сгенерированный контент, а вручную выбранные статьи, 
        новости и исследования, актуальные на 2026 год. Мы провели глубокий фактчекинг, 
        а также поделились своим уникальным видением в разделах, необходимых для премиального 
        присутствия бренда на рынке.
      </p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60">
        Вы можете саморазвиваться по данным материалам, использовать их для самостоятельного 
        продвижения или сверять лучшие практики с вашим заказом услуг у нас. 
        Мы открываем свои карты, потому что настоящая экспертность не боится прозрачности.
      </p>
    </div>
  </section>
);

export default BlogHeroSection;
