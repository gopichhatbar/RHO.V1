import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { FileText, CheckSquare, Ban, Users, Link2, DollarSign, AlertTriangle, Scale, RefreshCw, Mail, ChevronRight, Shield } from "lucide-react";
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import SEO, { SITE_URL } from "@/components/SEO";

const sections = [
  {
    icon: CheckSquare,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using realgameapps.com you agree to be bound by these Terms of Use.",
      "If you do not agree with any part of these terms, you must immediately stop using this website.",
      "These terms apply to all visitors, registered users, and anyone who accesses or uses our services.",
      "We may revise these terms at any time. Continued use after a revision constitutes acceptance of the updated terms.",
    ],
  },
  {
    icon: FileText,
    title: "2. Use of Content",
    content: [
      "All content on Realgameapps — text, graphics, logos, images, app reviews, rankings, and data — is the intellectual property of Realgameapps or its licensors.",
      "You may read and share links to our content for personal, non-commercial purposes.",
      "You may not reproduce, republish, distribute, scrape, or create derivative works from our content without prior written permission.",
      "Unauthorised use may result in legal action under Indian intellectual property laws.",
    ],
  },
  {
    icon: Ban,
    title: "3. Prohibited Conduct",
    content: [
      "The following activities are strictly prohibited on Realgameapps:",
      "Using the site for any unlawful purpose or in violation of applicable Indian laws.",
      "Attempting to gain unauthorised access to our servers, databases, or other systems.",
      "Uploading or transmitting malicious code, viruses, or disruptive data.",
      "Impersonating any person, entity, or Realgameapps staff member.",
      "Using automated tools (bots, scrapers, crawlers) to harvest content without permission.",
      "Engaging in any activity that degrades site performance or interferes with other users.",
    ],
  },
  {
    icon: Users,
    title: "4. Eligibility",
    content: [
      "Realgameapps is intended solely for users who are 18 years of age or older.",
      "By using this site, you represent that you are at least 18 years old and legally permitted to access real-money gaming content in your jurisdiction.",
      "It is your responsibility to determine whether accessing this content is lawful in your state or territory.",
      "We reserve the right to terminate access for any user who we believe does not meet these eligibility requirements.",
    ],
  },
  {
    icon: Link2,
    title: "5. Third-Party Links",
    content: [
      "Realgameapps contains links to external Realgameappslications and websites provided for your convenience.",
      "We have no control over the content, privacy practices, or terms of those third-party platforms.",
      "A link from Realgameapps does not constitute an endorsement or warranty of that platform's safety, security, or reliability.",
      "We accept no responsibility for any loss or damage arising from your use of linked third-party services.",
      "Always review a platform's own terms and privacy policy before registering or depositing.",
    ],
  },
  {
    icon: DollarSign,
    title: "6. Affiliate Disclosure",
    content: [
      "Some links on Realgameapps are affiliate links. When you click these and complete a qualifying action (such as registering or depositing), Realgameapps may receive a referral commission.",
      "This commission is paid by the partner platform — you pay nothing extra.",
      "Affiliate relationships do not influence our editorial ratings, rankings, or reviews. Our assessments are independent and based on actual testing criteria.",
      "We disclose all material connections with third parties in compliance with applicable advertising standards.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "7. Disclaimer of Warranties",
    content: [
      "This website and all content are provided on an 'as is' and 'as available' basis without warranties of any kind.",
      "Realgameapps expressly disclaims all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the site will be uninterrupted, error-free, or free of viruses or harmful components.",
      "App ratings, bonus amounts, and other data may change without notice. Always verify details directly with the respective app provider.",
    ],
  },
  {
    icon: Scale,
    title: "8. Limitation of Liability",
    content: [
      "To the fullest extent permitted by Indian law, Realgameapps and its owners, editors, and contributors shall not be liable for:",
      "Any direct, indirect, incidental, consequential, or punitive damages arising from your use of this site.",
      "Losses arising from reliance on any information, rating, or recommendation published on Realgameapps.",
      "Any financial loss incurred while playing on third-party Realgameappsplatforms linked from this site.",
      "Technical failures, data loss, or service interruptions.",
    ],
  },
  {
    icon: Scale,
    title: "9. Governing Law & Disputes",
    content: [
      "These Terms of Use shall be governed by and construed in accordance with the laws of India.",
      "Any disputes, controversies, or claims arising out of or in connection with these terms shall first be attempted to be resolved through good-faith negotiation.",
      "If negotiation fails, disputes shall be subject to the exclusive jurisdiction of the competent courts of India.",
    ],
  },
  {
    icon: RefreshCw,
    title: "10. Changes to These Terms",
    content: [
      "Realgameapps reserves the right to modify these Terms of Use at any time without prior notice.",
      "Changes become effective immediately upon posting to this page.",
      "The 'Last updated' date at the top of this page will reflect the most recent revision.",
      "Your continued use of the website after any changes constitutes your acceptance of the new terms.",
    ],
  },
  {
    icon: Mail,
    title: "11. Contact Us",
    content: [
      "If you have questions or concerns about these Terms of Use, please reach out to us:",
      "Email: support@realgameapps.com",
      "Contact page: realgameapps.com/contact",
      "We aim to respond to all enquiries within 3 business days.",
    ],
  },
];

const TermsOfUse = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Use | Realgameapps",
      url: `${SITE_URL}/terms`,
      description: "Review the Terms of Use for Realgameapps. Governs your access to and use of our content and services.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}/terms` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms of Use | Realgameapps"
        description="Review the Terms of Use for Realgameapps. By accessing our website you agree to these terms governing the use of our content and services."
        keywords="terms of use Realgameapps, Realgameapps terms conditions, website terms india, Realgameappssite terms, user agreement Realgameapps"
        type="article"
        path="/terms"
        jsonLd={jsonLd}
      />
      <Suspense fallback={null}><Header /></Suspense>

      {/* Hero */}
      <section className="bg-gradient-hero py-14">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center justify-center gap-1 text-primary-foreground/60 text-xs mb-4">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary-foreground">Terms of Use</span>
            </nav>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-4xl font-extrabold text-primary-foreground">Terms of Use</h1>
            <p className="text-primary-foreground/70 mt-2 text-sm">Last updated: April 2025</p>
          </motion.div>
        </div>
      </section>

      <main className="container py-12 max-w-3xl">
        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mb-8 text-sm text-muted-foreground leading-relaxed">
          Please read these Terms of Use carefully before using <strong className="text-foreground">realgameapps.com</strong>. By accessing or using this website, you confirm that you have read, understood, and agree to be bound by these terms.
        </motion.div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="font-heading font-bold text-foreground text-lg">{s.title}</h2>
              </div>
              <ul className="space-y-1.5">
                {s.content.map((line, j) => (
                  <li key={j} className={`text-sm leading-relaxed ${j === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {j > 0 && <span className="text-blue-500 mr-1.5">•</span>}{line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Related */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/privacy" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Privacy Policy</p>
              <p className="text-xs text-muted-foreground">How we handle your data</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </Link>
          <Link to="/disclaimer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Disclaimer</p>
              <p className="text-xs text-muted-foreground">Liability & informational use</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </Link>
        </div>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default TermsOfUse;
