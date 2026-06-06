import { Link } from "react-router-dom";
import { CITIES } from "@/data/cities";
import { MapPin } from "lucide-react";
import { useT } from "@/i18n/translations";

interface Props {
  service: "web-development" | "seo";
  title: string;
  subtitle?: string;
}

const CitiesLinkGrid = ({ service, title, subtitle }: Props) => {
  const { lang } = useT();
  // Regional Russian city pages are not available in English.
  if (lang === "en") return null;
  return (
  <section className="border-t bg-secondary py-12 md:py-16">
    <div className="container max-w-5xl">
      <h2 className="text-center font-heading text-xl font-bold md:text-2xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">{subtitle}</p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {CITIES.map((c) => (
          <Link
            key={c.slug}
            to={`/services/${service}/${c.slug}`}
            className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
            <span>{c.nom}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
  );
};

export default CitiesLinkGrid;