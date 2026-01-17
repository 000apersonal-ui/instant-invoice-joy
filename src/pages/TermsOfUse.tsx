import { FileText, AlertCircle, Scale, Ban, RefreshCw, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Use</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using FreeInvoiceGen.online, you accept and agree to be bound by these 
                    Terms of Use. If you do not agree to these terms, please do not use our service. We reserve 
                    the right to modify these terms at any time without prior notice.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Service Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    FreeInvoiceGen.online provides a free, browser-based invoice generation tool. Users can 
                    create professional invoices by entering their business and client information, adding 
                    line items, and generating downloadable PDF invoices. The service is provided "as is" 
                    without any warranties.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">User Responsibilities</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You are responsible for ensuring the accuracy of all information entered into your invoices. 
                    You agree to use this service only for lawful purposes and in compliance with all applicable 
                    laws and regulations.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Ensure all invoice information is accurate and truthful</li>
                    <li>Comply with applicable tax and business regulations</li>
                    <li>Not use the service for fraudulent activities</li>
                    <li>Maintain your own records and backups</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Ban className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    FreeInvoiceGen.online and its founder shall not be liable for any direct, indirect, 
                    incidental, special, or consequential damages arising from the use or inability to use 
                    this service. We do not guarantee uninterrupted or error-free service availability.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Changes to Service</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any part of the service at any 
                    time without prior notice. We may also update these Terms of Use periodically, and 
                    continued use of the service constitutes acceptance of any changes.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Use, please contact us at:{" "}
                    <a href="mailto:freeinvoicegen.online@gmail.com" className="text-primary hover:underline">
                      freeinvoicegen.online@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
