import { useState } from "react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

import { Mail, MapPin, Phone, Send, MessageCircle, Clock } from "lucide-react";
////////lazy loading
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import SEO from "@/components/SEO";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Realgameapps",
  description: "Get in touch with the Realgameapps team for support, feedback, or app listing inquiries.",
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
   
      <SEO
          title="Contact Realgameapps — Support, App Listing & Help"
          description="Contact Realgameapps for support, app listing, partnerships, or queries. Reach us via email, phone, or contact form. Fast response within 24 hours."
          path="/contact"
          jsonLd={contactJsonLd}
          keywords="contact Realgameapps, Realgameappssupport india, Realgameapps listing, Realgameappshelp, contact Realgameappswebsite, Realgameapps email support"
          type="website"
/>
      <Header />

      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Have questions, feedback, or want to list your app? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              { icon: Mail, title: "Email Us", value: "support@realgameapps.com", desc: "For general inquiries" },
              
              { icon: MapPin, title: "Visit Us", value: "Mumbai, Maharashtra", desc: "India" },
              { icon: Clock, title: "Response Time", value: "Within 24 hours", desc: "We reply fast!" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl border border-border p-5 shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-foreground text-sm font-medium">{item.value}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-accent/10 rounded-2xl border border-accent/20 p-5">
              <h3 className="font-heading font-bold text-foreground text-sm mb-2">Quick Connect</h3>
              <div className="flex gap-2">
                <a href="#" className="flex-1 h-10 rounded-xl bg-green-500 text-primary-foreground flex items-center justify-center gap-1.5 text-xs font-semibold hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a href="#" className="flex-1 h-10 rounded-xl bg-sky-500 text-primary-foreground flex items-center justify-center gap-1.5 text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Send className="w-3.5 h-3.5" /> Telegram
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card rounded-2xl border border-border p-8 shadow-card">
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Tell us more..." />
              </div>
              <button type="submit" className="h-12 px-8 rounded-xl bg-gradient-hero text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-hero">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
