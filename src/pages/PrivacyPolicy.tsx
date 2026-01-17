import { Shield, Lock, Eye, Database, Mail, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    FreeInvoiceGen.online is designed with your privacy in mind. We do not require any account 
                    registration or login. The invoice data you enter (such as business names, addresses, and 
                    invoice items) is processed entirely in your browser and is never transmitted to or stored 
                    on our servers.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Data Storage</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All invoice data is stored locally in your browser using localStorage technology. This means 
                    your data stays on your device and is not accessible to us or any third parties. You can 
                    clear this data at any time by clearing your browser's local storage.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Since we do not collect or store your personal invoice data on our servers, there is no 
                    risk of data breaches affecting your invoice information. Your data remains secure on your 
                    own device. We use HTTPS encryption to ensure all communications with our website are secure.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Analytics & Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may use anonymized analytics to understand how users interact with our website. These 
                    analytics do not collect personally identifiable information. We may use essential cookies 
                    to ensure the proper functioning of our website.
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
                    If you have any questions about this Privacy Policy, please contact us at:{" "}
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

export default PrivacyPolicy;
