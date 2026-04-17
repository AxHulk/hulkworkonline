import { useState, FormEvent, Suspense, lazy } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import ErrorBoundary from "@/components/ErrorBoundary";

const Hulk3DScene = lazy(() => import("./Hulk3DScene"));

const CTASection = () => {
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("home_cta");
    setTimeout(() => {
      setLoading(false);
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      (e.target as HTMLFormElement).reset();
      setConsent(false);
    }, 800);
  };

  return (
    <section id="cta" className="relative py-20 md:py-28" style={{ background: "#F0E8F8" }}>
      <div className="container">
        <h2 className="mb-12 text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          Готовы создать шедевр?
        </h2>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — form */}
          <div className="rounded-2xl bg-background p-8 shadow-lg">
            <p className="mb-6 text-muted-foreground">
              Оставьте заявку, и мы свяжемся с вами для обсуждения деталей
              проекта.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input placeholder="Ваше имя" name="name" required />
              <Input
                placeholder="Telegram или Email"
                name="contact"
                required
              />
              <Textarea
                placeholder="Кратко о задаче"
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
                {loading ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </div>

          {/* Right — 3D model + Telegram */}
          <div className="flex flex-col items-center gap-8">
            <div className="h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-lg md:h-80">
              <ErrorBoundary
                silent
                fallback={
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 p-6 text-center">
                    <p className="font-heading text-lg font-semibold text-primary">
                      HulkWork Studio
                    </p>
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-muted/30">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-primary/30" />
                    </div>
                  }
                >
                  <Hulk3DScene />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-lg">
              <p className="mb-4 text-sm text-muted-foreground">
                Или напишите нам напрямую. Мы отвечаем за&nbsp;5&nbsp;минут и
                готовы обсудить проект прямо сейчас.
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
