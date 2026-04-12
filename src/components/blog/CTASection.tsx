import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCTASection = () => (
  <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
        Нет времени на самостоятельное изучение?
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
        Вы знаете теорию, мы владеем практикой. Доверьте реализацию этих стратегий 
        команде HulkWork Studio.
      </p>
      <Button asChild size="lg" className="gap-2">
        <Link to="/about">
          Обсудить проект <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </section>
);

export default BlogCTASection;
