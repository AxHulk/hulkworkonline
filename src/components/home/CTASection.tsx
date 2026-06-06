import { useState, FormEvent, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { submitLead } from "@/lib/leads";
import { useQuiz } from "@/components/quiz/QuizContext";
import { Globe, Search, Activity, ArrowRight } from "lucide-react";
import type { Group } from "three";
import { useT } from "@/i18n/translations";

function HulkModel() {
  const { scene } = useGLTF("/models/hulk_bust.glb");
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.1}
      position={[0, -0.2, 0]}
    />
  );
}

const CTASection = () => {
  const { t } = useT();
  const { openQuiz } = useQuiz();
  type Service = "website" | "seo" | "behavioral";
  const [service, setService] = useState<Service>("website");
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error(t("toast.consentRequired"));
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("home_cta");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitLead({
        source: "home_cta",
        name: String(fd.get("name") || "").trim(),
        contact: String(fd.get("contact") || "").trim(),
        message: String(fd.get("task") || "").trim() || undefined,
      });
      toast.success(t("toast.leadSuccess"));
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error(err);
      toast.error(t("toast.leadError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="relative py-20 md:py-28" style={{ background: "#F0E8F8" }}>
      <div className="container">
        <h2 className="mb-12 text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          {t("home.cta.title")}
        </h2>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — form */}
          <div className="rounded-2xl bg-background p-8 shadow-lg">
            <p className="mb-6 text-muted-foreground">
              {t("home.cta.formIntro")}
            </p>

            {/* Service picker */}
            <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {([
                { key: "website" as const, label: t("home.cta.service.website"), Icon: Globe },
                { key: "seo" as const, label: t("home.cta.service.seo"), Icon: Search },
                { key: "behavioral" as const, label: t("home.cta.service.behavioral"), Icon: Activity },
              ]).map(({ key, label, Icon }) => {
                const active = service === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setService(key)}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-heading font-semibold transition sm:text-sm ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-input bg-background text-foreground hover:border-primary/50"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {service === "website" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input placeholder={t("home.cta.placeholder.name")} name="name" required />
              <Input
                placeholder={t("home.cta.placeholder.contact")}
                name="contact"
                required
              />
              <Textarea
                placeholder={t("home.cta.placeholder.task")}
                name="task"
                rows={4}
                className="resize-none"
              />
              <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
              <Button
                type="submit"
                size="lg"
                className="font-heading font-semibold"
                disabled={loading}
              >
                {loading ? t("home.cta.submitting") : t("home.cta.submit")}
              </Button>
            </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border bg-secondary/40 p-4 text-sm text-muted-foreground">
                  {service === "seo" ? (
                    <>
                      <p className="font-heading font-semibold text-foreground">
                        {t("home.cta.seo.title")}
                      </p>
                      <p className="mt-1">
                        {t("home.cta.seo.desc")}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-heading font-semibold text-foreground">
                        {t("home.cta.behavioral.title")}
                      </p>
                      <p className="mt-1">
                        {t("home.cta.behavioral.desc")}
                      </p>
                    </>
                  )}
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="gap-2 font-heading font-semibold"
                  onClick={() =>
                    openQuiz(
                      service === "seo" ? "home_cta_seo" : "home_cta_behavioral",
                      "seo"
                    )
                  }
                >
                  {t("home.cta.openQuiz")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Right — 3D model + Telegram */}
          <div className="flex flex-col items-center gap-8">
            <div className="h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-lg md:h-80">
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-3, 3, 2]} intensity={0.5} color="#6B2FA0" />
                <Suspense fallback={null}>
                  <HulkModel />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                />
              </Canvas>
            </div>

            <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-lg">
              <p className="mb-4 text-sm text-muted-foreground">
                {t("home.cta.directMessage")}
              </p>
              <Button
                size="lg"
                className="w-full gap-2 font-heading font-semibold"
                asChild
              >
                <a
                  href="https://t.me/MalHulk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  @MalHulk в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
