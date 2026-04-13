import { useState, FormEvent, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Group } from "three";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      (e.target as HTMLFormElement).reset();
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
            {/* 3D Model */}
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

            {/* Telegram */}
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
