import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "how-to-create-professional-invoice-2026",
    title: "How to Create a Professional Invoice in 2026: Complete Guide for Freelancers",
    description: "Learn step-by-step how to create professional invoices that get you paid faster. Essential tips for freelancers and small business owners.",
    category: "Invoicing Tips",
    readTime: "8 min read",
    date: "January 15, 2026",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    slug: "free-invoice-template-pdf-download",
    title: "Free Invoice Template PDF Download: 10+ Best Invoice Formats for Small Business",
    description: "Download free invoice templates in PDF format. Choose from 10+ professional invoice formats perfect for small businesses and freelancers.",
    category: "Templates & Tools",
    readTime: "6 min read",
    date: "January 12, 2026",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    slug: "what-to-include-in-invoice",
    title: "What to Include in an Invoice: 12 Essential Elements You Can't Miss",
    description: "Discover the 12 must-have elements every professional invoice needs. Avoid payment delays with our complete invoice checklist.",
    category: "Invoicing Tips",
    readTime: "7 min read",
    date: "January 10, 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    slug: "how-to-get-clients-pay-invoices-faster",
    title: "How to Get Clients to Pay Invoices Faster: 8 Proven Strategies (2026)",
    description: "Stop chasing payments! Learn 8 proven strategies to get your invoices paid faster and improve your cash flow.",
    category: "Payment Solutions",
    readTime: "10 min read",
    date: "January 8, 2026",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    slug: "invoice-vs-receipt-vs-bill-difference",
    title: "Invoice vs Receipt vs Bill: What's the Difference? (Simple Explanation)",
    description: "Confused about invoices, receipts, and bills? This simple guide explains the key differences and when to use each document.",
    category: "Tax & Legal",
    readTime: "5 min read",
    date: "January 5, 2026",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=60"
  }
];

const categories = [
  "All Posts",
  "Invoicing Tips",
  "Freelance Business",
  "Payment Solutions",
  "Tax & Legal",
  "Templates & Tools"
];

const Blog = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollToTool={scrollToTop} />
      
      {/* Blog Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            📚 InvoiceCreate.online Blog
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Free Invoice Generator Blog
            <span className="block text-primary mt-2">Invoicing Tips & Business Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert guides on invoicing, freelancing, small business management, and getting paid faster. 
            Learn how to create professional invoices and grow your business.
          </p>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All Posts" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Latest Invoicing & Business Guides
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest tips, tricks, and best practices for creating invoices, 
              managing clients, and running your freelance or small business successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Create Your Professional Invoice?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use our free invoice generator to create and download your invoice PDF in under 60 seconds - no signup required!
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Create Free Invoice Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
