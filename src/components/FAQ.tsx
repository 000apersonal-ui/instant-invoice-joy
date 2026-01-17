import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Is this invoice generator really free?",
    answer: "Yes! Our tool is 100% free with no hidden costs, premium tiers, or subscription fees. Create unlimited professional invoices without ever paying a cent.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can start creating invoices immediately—no email required, no registration process, no passwords to remember.",
  },
  {
    question: "Is my invoice data safe?",
    answer: "Absolutely. We don't store any of your information. All data stays on your device for complete privacy. Your business and client details are never uploaded to our servers.",
  },
  {
    question: "Can I use this on my phone?",
    answer: "Yes! Our tool is fully responsive and works seamlessly on mobile devices, tablets, and desktops. Create professional invoices anytime, anywhere.",
  },
  {
    question: "What format is the invoice downloaded in?",
    answer: "Your invoice is downloaded as a professional PDF file that you can easily share with clients via email, messaging apps, or print for physical records.",
  },
  {
    question: "Can I customize the invoice with my business details?",
    answer: "Yes! You can add your business name, logo, tagline, contact information, bank details, and customize all invoice fields to match your branding.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about creating invoices with our tool.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
