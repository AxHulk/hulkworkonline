import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Rocket } from "lucide-react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { useT } from "@/i18n/translations";

const CTASection = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast.error(isEn ? "Please fill in your name and contact" : "Пожалуйста, заполните имя и контакт для связи");
      return;
    }
    if (!consent) {
      setConsentError(true);
      toast.error(isEn ? "Please accept the privacy policy to continue" : "Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    logConsent("about_cta");
    toast.success(isEn ? "Thank you! We'll be in touch shortly." : "Спасибо! Мы свяжемся с вами в ближайшее время.");
    setName(""); setContact(""); setTask(""); setBudget(""); setConsent(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-bold md:text-4xl">{isEn ? "Ready to challenge us?" : "Готовы бросить нам вызов?"}</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          {isEn
            ? "Describe your task — even if it seems impossible. We'll study it, propose an optimal solution and quote a fair price. No fluff, no drawn-out negotiations."
            : "Опишите вашу задачу — даже если она кажется вам нереальной. Мы изучим её, предложим оптимальное решение и назовём честную цену. Без лишних слов и затяжных переговоров."}
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
          <Input placeholder={isEn ? "Your name" : "Ваше имя"} value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder={isEn ? "Email or Telegram" : "Email или Telegram для связи"} value={contact} onChange={(e) => setContact(e.target.value)} />
          <Textarea placeholder={isEn ? "Describe your task or project" : "Опишите вашу задачу или проект"} value={task} onChange={(e) => setTask(e.target.value)} rows={4} />
          <Input placeholder={isEn ? "Your budget (optional)" : "Ваш бюджет (необязательно)"} value={budget} onChange={(e) => setBudget(e.target.value)} />
          <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
          <Button type="submit" size="lg" className="w-full">
            <Rocket className="mr-2 h-4 w-4" />
            {isEn ? "Discuss the project" : "Обсудить проект"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
