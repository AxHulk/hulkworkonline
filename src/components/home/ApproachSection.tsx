import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import approachImg from "@/assets/main_approach.png";
import { useT } from "@/i18n/translations";

const ApproachSection = () => {
  const { t, lp } = useT();
  return (
  <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#1A0A2E" }}>
    {/* Decorative blur */}
    <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

    <div className="container relative z-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={approachImg}
            alt={t("home.approach.title")}
            className="w-full max-w-lg rounded-2xl"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {t("home.approach.title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            {t("home.approach.p1")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {t("home.approach.p2")}
          </p>
          <Link
            to={lp("/about")}
            className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold text-white transition-colors hover:text-accent"
          >
            {t("home.approach.cta")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ApproachSection;
