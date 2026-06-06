import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/translations";

const PortfolioSection = () => {
  const { t, lp } = useT();
  const projects = [
    { title: "PayCross", category: t("home.portfolio.paycross.cat"), description: t("home.portfolio.paycross.desc") },
    { title: "HulkWork Studio", category: t("home.portfolio.hulkwork.cat"), description: t("home.portfolio.hulkwork.desc") },
    { title: t("home.portfolio.botpf.title"), category: t("home.portfolio.botpf.cat"), description: t("home.portfolio.botpf.desc") },
    { title: "Kvanteks", category: t("home.portfolio.kvanteks.cat"), description: t("home.portfolio.kvanteks.desc") },
    { title: t("home.portfolio.smm.title"), category: t("home.portfolio.smm.cat"), description: t("home.portfolio.smm.desc") },
  ];
  return (
  <section
    className="relative overflow-hidden py-20 md:py-28"
    style={{ background: "#FAFAFA" }}
  >
    {/* Hex pattern */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236B2FA0' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />

    <div className="container relative z-10">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
        {t("home.portfolio.title")}
      </h2>

      {/* Horizontal scroll */}
      <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
        <div className="flex gap-6" style={{ minWidth: "max-content" }}>
          {projects.map((p) => (
            <Card
              key={p.title}
              className="w-72 shrink-0 border bg-background transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {p.category}
                </Badge>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2 font-heading font-semibold" asChild>
          <Link to={lp("/portfolio")}>
            {t("home.portfolio.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
  );
};

export default PortfolioSection;
