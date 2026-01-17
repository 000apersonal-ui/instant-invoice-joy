import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-xl mx-auto">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <FileQuestion className="w-16 h-16 text-primary" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full animate-float" />
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-secondary/30 rounded-full animate-float-delayed" />
          </div>

          {/* Error Code */}
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track.
          </p>

          {/* Attempted URL */}
          <div className="bg-muted/50 rounded-xl p-4 mb-8 inline-block">
            <p className="text-sm text-muted-foreground">
              Attempted URL: <code className="text-primary font-mono">{location.pathname}</code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular pages you might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                Invoice Generator
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/blog" 
                className="text-sm text-primary hover:underline"
              >
                Blog
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/about-us" 
                className="text-sm text-primary hover:underline"
              >
                About Us
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/privacy-policy" 
                className="text-sm text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
