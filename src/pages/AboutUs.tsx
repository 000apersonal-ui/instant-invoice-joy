import { User, Target, Heart, Lightbulb, Mail, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empowering freelancers and small businesses with simple, free invoicing tools.
            </p>
          </div>

          {/* Founder Section */}
          <section className="bg-card rounded-2xl border border-border p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-16 h-16 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">ABDULLAH DOGAR</h2>
                <p className="text-primary font-medium mb-4">Founder & Developer</p>
                <p className="text-muted-foreground leading-relaxed">
                  As a passionate developer and entrepreneur, I created FreeInvoiceGen.online to solve a 
                  common problem faced by freelancers and small business owners. I believe that essential 
                  business tools should be accessible to everyone, regardless of their budget.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide a completely free, easy-to-use invoice generator that helps freelancers and 
                    small businesses look professional without spending a dime.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the go-to platform for free invoicing tools, helping millions of 
                    entrepreneurs worldwide manage their billing effortlessly.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Values */}
          <section className="bg-card rounded-2xl border border-border p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Values</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium text-foreground mb-2">Simplicity</h4>
                <p className="text-muted-foreground text-sm">
                  We believe in keeping things simple. No complex features, no learning curve.
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium text-foreground mb-2">Accessibility</h4>
                <p className="text-muted-foreground text-sm">
                  Free for everyone. No hidden fees, no premium tiers, no credit card required.
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium text-foreground mb-2">Privacy</h4>
                <p className="text-muted-foreground text-sm">
                  Your data stays in your browser. We don't collect or store your invoice information.
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium text-foreground mb-2">Quality</h4>
                <p className="text-muted-foreground text-sm">
                  Professional-looking invoices that help you make a great impression.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="mailto:freeinvoicegen.online@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>freeinvoicegen.online@gmail.com</span>
              </a>
              <a 
                href="https://freeinvoicegen.online"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <span>freeinvoicegen.online</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
