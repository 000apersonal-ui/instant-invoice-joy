import { FileEdit, Eye, Download } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    step: "Step 1",
    title: "Enter Your Business Details",
    description: "Fill in your business information and client details using our easy-to-use invoice generator online form.",
  },
  {
    icon: Eye,
    step: "Step 2",
    title: "Add Invoice Items & Preview",
    description: "Add products or services, set quantities and prices, and watch your invoice update in real-time.",
  },
  {
    icon: Download,
    step: "Step 3",
    title: "Download Your Invoice PDF Instantly",
    description: "Preview your professional invoice and download the PDF in seconds—completely free.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Our Free Invoice Generator Online Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create professional invoices in three simple steps with our <strong>invoice generator free</strong> tool.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="bg-card border-2 border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                {/* Step Label */}
                <div className="text-sm font-medium text-primary mb-2">{step.step}</div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
