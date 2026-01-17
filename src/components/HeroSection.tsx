import { Button } from "@/components/ui/button";
import { FileText, Zap, FileCheck, DollarSign, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onScrollToTool: () => void;
}

const HeroSection = ({ onScrollToTool }: HeroSectionProps) => {
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
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
            <span>100% Free – No Signup Required</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Free Invoice Generator – PDF in 60 Seconds
          </h1>

          {/* SEO Intro Paragraph - Natural Language */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Need to send a professional invoice quickly? <strong>InvoiceCreate.online</strong> helps freelancers, contractors, and small businesses create beautiful PDF invoices instantly—no registration, no hidden fees, and complete privacy.
          </p>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
            Simply fill in your details, preview your invoice in real-time, and download a clean PDF ready to send to your clients in under 60 seconds.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              onClick={onScrollToTool}
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Create My Invoice Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Ready in 60 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Professional PDF format</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Always free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Your data stays private</span>
            </div>
          </div>

          {/* Internal Links - Meaningful Pages */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-muted-foreground font-medium">Explore:</span>
            <Link to="/blog" className="text-primary hover:underline font-medium">
              Invoicing Tips & Guides
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/about-us" className="text-primary hover:underline font-medium">
              About Us
            </Link>
            <span className="text-muted-foreground">|</span>
            <button onClick={onScrollToTool} className="text-primary hover:underline font-medium">
              Start Creating →
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image Section - Below Hero Content */}
      <div className="relative w-full bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 max-w-4xl mx-auto">
            <img 
              src="https://i.ibb.co/b5sr52xH/IMG-20260116-103017.jpg" 
              alt="Professional Invoice Generator - Create Free Invoices Online" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
