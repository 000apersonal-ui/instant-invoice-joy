import { Button } from "@/components/ui/button";
import { FileText, Zap, FileCheck, DollarSign, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onScrollToTool: () => void;
}

const HeroSection = ({ onScrollToTool }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-secondary/30 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 text-sm font-medium">
          <Shield className="w-4 h-4" />
          <span>100% Free Invoice Generator - No Signup Required</span>
        </div>

        {/* H1 - Primary Keyword Optimized */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Free Invoice Generator Online – Create & Download Professional Invoice PDFs Instantly
        </h1>

        {/* SEO Intro Paragraph with Keywords */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Looking for a <strong>free invoice generator</strong> to create professional invoices in seconds? <strong>FreeInvoiceGen.online</strong> is your trusted <strong>invoice generator online</strong> that helps freelancers, contractors, and small businesses generate invoice PDFs instantly—no registration, no hidden fees, and complete privacy.
        </p>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
          Our <strong>free invoice generator online</strong> lets you fill in your business details, preview your invoice in real-time, and download a clean, professional PDF invoice in under 60 seconds.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Button
            size="lg"
            onClick={onScrollToTool}
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Create My Free Invoice Now
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Takes less than 60 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Professional PDF invoices</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Always 100% free</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>No data stored—privacy guaranteed</span>
          </div>
        </div>

        {/* Internal Links for SEO - Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <span className="text-muted-foreground font-medium">Quick Links:</span>
          <Link to="/" onClick={onScrollToTool} className="text-primary hover:underline font-medium">
            Free Invoice Generator
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/" onClick={onScrollToTool} className="text-primary hover:underline font-medium">
            Invoice Generator Online
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link to="/" onClick={onScrollToTool} className="text-primary hover:underline font-medium">
            Download Invoice PDF Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
