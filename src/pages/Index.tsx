import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InvoiceForm from "@/components/InvoiceForm";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollToTool={scrollToTool} />
      <HeroSection onScrollToTool={scrollToTool} />
      <div ref={toolRef}>
        <InvoiceForm />
      </div>
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
