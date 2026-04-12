import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Rocket } from "lucide-react";

const CTASection = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast.error("Пожалуйста, заполните имя и контакт для связи");
      return;
    }
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setName(""); setContact(""); setTask(""); setBudget("");
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-bold md:text-4xl">Готовы бросить нам вызов?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Опишите вашу задачу — даже если она кажется вам нереальной. Мы изучим её, предложим оптимальное решение и назовём честную цену. Без лишних слов и затяжных переговоров.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
          <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email или Telegram для связи" value={contact} onChange={(e) => setContact(e.target.value)} />
          <Textarea placeholder="Опишите вашу задачу или проект" value={task} onChange={(e) => setTask(e.target.value)} rows={4} />
          <Input placeholder="Ваш бюджет (необязательно)" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <Button type="submit" size="lg" className="w-full">
            <Rocket className="mr-2 h-4 w-4" />
            Обсудить проект
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
