import { FileText, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        {/* SEO Footer Text */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong>InvoiceGenerator.online</strong> is a professional <strong>free invoice generator online</strong> for freelancers and small businesses. Create invoices online, download PDF instantly, and manage billing without signup or cost.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <img 
                src="https://i.ibb.co/hxGQ7kbk/Picsart-26-01-15-10-47-02-140.png" 
                alt="Invoice Generator Online Logo" 
                className="w-6 h-6 rounded object-contain"
              />
              <h3 className="text-xl font-bold text-foreground">
                InvoiceGenerator.online
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Free invoice generator online for freelancers and small businesses
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm" aria-label="Footer Navigation">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/privacy-policy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              to="/about-us"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <a
              href="mailto:freeinvoicegen.online@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </nav>
        </div>

        {/* Copyright with SEO Keywords */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} InvoiceGenerator.online. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            <strong>Free invoice generator online</strong> - No signup required | Create professional invoice PDFs instantly
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
