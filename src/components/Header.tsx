import { useState } from "react";
import { FileText, Menu, X, Home, Shield, FileCheck, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  onScrollToTool: () => void;
}

const Header = ({ onScrollToTool }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about-us", icon: Users },
    { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
    { name: "Terms of Use", href: "/terms-of-use", icon: FileCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co/hxGQ7kbk/Picsart-26-01-15-10-47-02-140.png" 
            alt="Invoice Generator Online Logo" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <span className="font-bold text-lg text-foreground">
            Invoice Generator<span className="text-primary">.online</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button
            onClick={onScrollToTool}
            size="sm"
            className="rounded-full shadow-sm"
          >
            Create Invoice ✨
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            onClick={onScrollToTool}
            size="sm"
            className="rounded-full shadow-sm"
          >
            Create Invoice
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <img 
                    src="https://i.ibb.co/hxGQ7kbk/Picsart-26-01-15-10-47-02-140.png" 
                    alt="Invoice Generator Online Logo" 
                    className="w-8 h-8 rounded-lg object-contain"
                  />
                  <span className="font-bold">
                    Invoice Generator<span className="text-primary">.online</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  © 2026 InvoiceGenerator.online
                  <br />
                  Free Invoice Generator Online
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
