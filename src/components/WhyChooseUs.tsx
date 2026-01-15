import { Zap, Shield, Clock, Smartphone, Gift, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "100% Free Invoice Generator",
    description: "No hidden fees, no premium plans, no credit card required. Create unlimited invoices for free, forever.",
  },
  {
    icon: Zap,
    title: "Instant Invoice PDF Download",
    description: "Generate professional invoice PDFs and download them in under 60 seconds with our invoice generator online.",
  },
  {
    icon: Shield,
    title: "Privacy First – No Data Stored",
    description: "Your invoice data stays on your device only. We never store, track, or share your information.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Invoice Generator",
    description: "Create invoices from anywhere—our free invoice generator works perfectly on mobile, tablet, and desktop.",
  },
  {
    icon: Users,
    title: "Built for Freelancers & Small Businesses",
    description: "Designed specifically for contractors, freelancers, consultants, and small business owners across the USA.",
  },
  {
    icon: Clock,
    title: "No Signup Required",
    description: "Start creating invoices immediately. No registration, no login—just open and use our invoice generator free tool.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose FreeInvoiceGen.online as Your Invoice Generator Online?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The most trusted <strong>free invoice generator</strong> for freelancers, contractors, and small businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional SEO Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Perfect Invoice Generator Online for Freelancers & Small Businesses
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a freelancer, independent contractor, consultant, or small business owner, our <strong>free invoice generator online</strong> helps you create professional invoices quickly and easily. No expensive accounting software needed—just fill in your details and download your invoice PDF instantly.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            <strong>FreeInvoiceGen.online</strong> is the #1 <strong>invoice generator free</strong> tool trusted by thousands of professionals to streamline their billing process without any cost or signup hassle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
