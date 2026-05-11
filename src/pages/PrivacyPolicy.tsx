import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Cookie, Link2, Lock, UserCheck, Mail, ChevronRight } from "lucide-react";
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import SEO, { SITE_URL } from "@/components/SEO";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "When you browse Realgameapps, we may collect the following categories of data:",
      "Personal identifiers: name and email address if you contact us or subscribe to updates.",
      "Device & technical data: IP address, browser type, operating system, and screen resolution.",
      "Usage data: pages visited, time spent per page, scroll depth, clicks, and referral source.",
      "We never collect payment information — all transactions happen directly on third-party Realgameappsplatforms.",
    ],
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: [
      "We use the information we collect strictly for the following purposes:",
      "Service improvement: understanding which content is most useful to our readers.",
      "Communication: responding to contact form enquiries and sending opt-in newsletters about new app reviews and bonus offers.",
      "Analytics: measuring site performance and diagnosing technical issues.",
      "Legal compliance: fulfilling obligations under applicable Indian laws and regulations.",
      "We do not sell, rent, or trade your personal information to any third party for their marketing purposes.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking Technologies",
    content: [
      "Realgameapps uses cookies and similar technologies including local storage and pixel tags.",
      "Essential cookies: required for the site to function (session management, security).",
      "Analytics cookies: Google Analytics 4 to understand aggregate traffic patterns. Data is anonymised and not linked to individuals.",
      "Affiliate cookies: when you click an app referral link, the partner platform may set a cookie to track sign-ups for commission purposes.",
      "You can disable non-essential cookies at any time via your browser settings. Note that disabling cookies may affect some site functionality.",
    ],
  },
  {
    icon: Link2,
    title: "Third-Party Links & Affiliate Disclosure",
    content: [
      "Realgameapps links to third-party Realgameappslications and platforms. We are not responsible for the privacy practices, terms, or content of those external sites.",
      "Some links on this site are affiliate links. If you click through and register or deposit on a partner platform, Realgameapps may earn a referral commission at no additional cost to you.",
      "Our reviews and ratings remain editorially independent. Affiliate relationships do not influence app scores or recommendations.",
      "We recommend reviewing the privacy policy of any third-party app before creating an account or depositing money.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We take reasonable technical and organisational measures to protect any personal data we hold from unauthorised access, alteration, disclosure, or destruction.",
      "Our website is served over HTTPS. Contact form submissions are transmitted securely.",
      "However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.",
      "In the event of a data breach that affects your rights, we will notify affected users as required by applicable law.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "You have the following rights regarding your personal data held by Realgameapps:",
      "Right of access: request a copy of the personal data we hold about you.",
      "Right to rectification: ask us to correct inaccurate or incomplete data.",
      "Right to erasure: request deletion of your personal data where we have no lawful basis to retain it.",
      "Right to withdraw consent: if processing is based on consent (e.g., newsletter), you may unsubscribe at any time.",
      "To exercise any of these rights, email us at support@realgameapps.com. We will respond within 30 days.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    content: [
      "If you have questions, concerns, or complaints about this Privacy Policy, please contact our team:",
      "Email: support@realgameapps.com",
      "Contact page: realgameapps.com/contact",
      "We reserve the right to update this policy at any time. Material changes will be highlighted on our homepage and the 'Last updated' date at the top of this page will be revised. Continued use of the site after changes constitutes acceptance of the updated policy.",
    ],
  },
];

const PrivacyPolicy = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy | Realgameapps",
      url: `${SITE_URL}/privacy`,
      description: "Read how Realgameapps collects, uses and protects your personal information.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy | Realgameapps"
        description="Read how Realgameapps collects, uses and protects your personal information when you browse our Realgameapps reviews and comparisons."
        keywords="privacy policy Realgameapps, user data protection india, Realgameappswebsite privacy, cookies policy india, online privacy policy"
        type="article"
        path="/privacy"
        jsonLd={jsonLd}
      />
      <Suspense fallback={null}><Header /></Suspense>

      {/* Hero */}
      <section className="bg-gradient-hero py-14">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-1 text-primary-foreground/60 text-xs mb-4">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary-foreground">Privacy Policy</span>
            </nav>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-4xl font-extrabold text-primary-foreground">Privacy Policy</h1>
            <p className="text-primary-foreground/70 mt-2 text-sm">Last updated: April 2025</p>
          </motion.div>
        </div>
      </section>

      <main className="container py-12 max-w-3xl">
        {/* Intro card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 text-sm text-muted-foreground leading-relaxed">
          Your privacy matters to us. This policy explains what data Realgameapps collects when you visit <strong className="text-foreground">realgameapps.com</strong>, how we use it, and the rights you have over it. Please read it carefully.
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-4.5 h-4.5 text-primary w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-foreground text-lg">{s.title}</h2>
              </div>
              <ul className="space-y-1.5">
                {s.content.map((line, j) => (
                  <li key={j} className={`text-sm leading-relaxed ${j === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {j > 0 && <span className="text-primary mr-1.5">•</span>}{line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Related legal pages */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/terms" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Terms of Use</p>
              <p className="text-xs text-muted-foreground">Rules for using Realgameapps</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </Link>
          <Link to="/disclaimer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-amber-500" />
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

export default PrivacyPolicy;
