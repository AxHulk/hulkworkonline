import { Monitor, MousePointerClick, SearchCheck, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useUsdRubRate, formatPrice } from "@/lib/exchangeRate";
import { useT } from "@/i18n/translations";

const ServicesSection = () => {
  const rate = useUsdRubRate();
  const { t, lang, lp } = useT();
  const fmt = (usd: number) => formatPrice(usd, lang, rate);
  const services = [
  {
    icon: Monitor,
    title: t("home.services.web.title"),
    description: t("home.services.web.desc"),
    price: t("home.services.priceFromHours", { price: fmt(500) }),
    href: "/services/web-development",
    linkText: t("home.services.web.cta"),
  },
  {
    icon: MousePointerClick,
    title: t("home.services.behavioral.title"),
    description: t("home.services.behavioral.desc"),
    price: t("home.services.priceMonth", { price: fmt(400) }),
    href: "/services/behavioral-factors",
    linkText: t("home.services.behavioral.cta"),
  },
  {
    icon: SearchCheck,
    title: t("home.services.seo.title"),
    description: t("home.services.seo.desc"),
    price: t("home.services.priceRequest"),
    href: "/services/seo",
    linkText: t("home.services.seo.cta"),
  },
  {
    icon: Megaphone,
    title: t("home.services.smm.title"),
    description: t("home.services.smm.desc"),
    price: t("home.services.priceTwoMonths", { price: fmt(250) }),
    href: "/services/smm",
    linkText: t("home.services.smm.cta"),
  },
  ];
  return (
    <section className="bg-background py-20 md:py-28">
    <div className="container">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
        {t("home.services.title")}
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card
            key={s.title}
            className="group flex flex-col border-2 border-transparent bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <CardContent className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <p className="mt-4 font-heading text-sm font-bold text-primary">
                {s.price}
              </p>
              <Link
                to={lp(s.href)}
                className="mt-3 text-sm font-medium text-primary/80 transition-colors hover:text-primary"
              >
                {s.linkText}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
};

export default ServicesSection;
