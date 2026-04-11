import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CTASection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder — later will save to DB
    setTimeout(() => {
      setLoading(false);
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="cta" className="bg-secondary py-16 md:py-24">
      <div className="container max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Готовы начать?</h2>
        <p className="mt-3 text-muted-foreground">
          Оставьте заявку и мы свяжемся с вами для бесплатной консультации
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-3">
          <Input placeholder="Имя" name="name" required />
          <Input placeholder="Email" name="email" type="email" required />
          <Input placeholder="Телефон" name="phone" type="tel" required />
          <div className="sm:col-span-3">
            <Button type="submit" size="lg" className="w-full font-heading font-semibold" disabled={loading}>
              {loading ? "Отправка..." : "Отправить заявку"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
