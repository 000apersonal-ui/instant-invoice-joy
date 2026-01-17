import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, CheckCircle2 } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find(p => p.slug === slug);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.metaDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollToTool={scrollToTop} />
      
      {/* Blog Post Header */}
      <article className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </nav>

          {/* Post Header */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {post.metaDescription}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full rounded-2xl shadow-lg aspect-video object-cover"
            />
          </div>

          {/* Quick Takeaway Box */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  ⚡ Quick Takeaway
                </h2>
                <ul className="space-y-2">
                  {post.quickTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Blog Content */}
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {post.sections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 my-4">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {post.conclusion}
              </p>
              <Card className="bg-primary text-primary-foreground p-6 text-center">
                <h3 className="font-bold text-xl mb-2">Ready to create professional invoices?</h3>
                <p className="mb-4 opacity-90">
                  Use our free invoice generator to create and download your invoice PDF in under 60 seconds - no signup required!
                </p>
                <Link to="/">
                  <Button variant="secondary" size="lg" className="rounded-full">
                    Create Free Invoice Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </Card>
            </section>

            {/* FAQ Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {post.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Related Resources */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Free Invoice Generator Tool
                </Link>
                <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  More Invoicing Tips & Guides
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
