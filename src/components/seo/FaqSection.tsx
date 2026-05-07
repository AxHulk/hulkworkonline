import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

export interface FaqItem { q: string; a: string }

interface Props {
  title: string;
  items: FaqItem[];
  jsonLd?: boolean;
}

const FaqSection = ({ title, items, jsonLd = true }: Props) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="py-14 md:py-20">
      <div className="container max-w-3xl">
        <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{title}</h2>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-heading">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {jsonLd && (
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(data)}</script>
          </Helmet>
        )}
      </div>
    </section>
  );
};

export default FaqSection;