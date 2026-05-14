import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Info, TrendingDown, UserX, MapPin, Link2, Heart, CheckCircle, Scale, ChevronRight, Shield, FileText } from "lucide-react";
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import SEO, { SITE_URL } from "@/components/SEO";

const sections = [
  {
    icon: Info,
    title: "1. General Information Only",
    content: [
      "Realgameapps publishes content for general informational and entertainment purposes only.",
      "Nothing on this website constitutes legal, financial, tax, or gambling advice of any kind.",
      "App reviews, ratings, bonus comparisons, and strategy articles reflect our editorial opinion based on testing and publicly available information.",
      "Users should exercise independent judgement and consult qualified professionals before making financial or legal decisions related to real-money gaming.",
    ],
  },
  {
    icon: TrendingDown,
    title: "2. No Guarantee of Winnings",
    content: [
      "Realgameapps does not guarantee any winnings, profits, or positive outcomes from using any app listed or reviewed on our platform.",
      "Real-money Realgameappsinvolves financial risk. Outcomes depend on skill, experience, and elements of chance.",
      "Past performance of any app, player, or strategy is not indicative of future results.",
      "Any earnings figures or bonus amounts mentioned are illustrative and subject to change by the respective platforms without notice.",
    ],
  },
  {
    icon: UserX,
    title: "3. Age Restriction — 18+ Only",
    content: [
      "All real-money Realgameappsgames are strictly for adults aged 18 years and above.",
      "By accessing the real-money gaming content on this site, you confirm that you are at least 18 years old.",
      "Realgameapps strongly discourages access or participation by minors.",
      "If you believe a minor is accessing this content, please contact us immediately at support@realgameapps.com.",
    ],
  },
  {
    icon: MapPin,
    title: "4. Geographical & Jurisdictional Restrictions",
    content: [
      "Real-money online Realgameappsis restricted or prohibited in certain Indian states and territories.",
      "Currently restricted states include: Andhra Pradesh, Telangana, Assam, Odisha, and certain union territories.",
      "States with specific licensing requirements include: Nagaland and Sikkim.",
      "It is solely your responsibility to verify whether online Realgameappsis lawful in your state or jurisdiction before registering or depositing on any platform.",
      "Realgameapps accepts no liability for users who access real-money platforms from restricted regions.",
    ],
  },
  {
    icon: Link2,
    title: "5. Third-Party Apps & Brand Disclaimer",
    content: [
      "Realgameapps reviews and links to third-party Realgameappslications. We are an independent review website and are not affiliated with, owned by, or officially endorsed by any of the apps we review.",
      "All brand names, trademarks, logos, and registered marks belong to their respective owners and are used on this site for informational and identification purposes only.",
      "Inclusion of an app on our site does not constitute a partnership, sponsorship, or endorsement unless explicitly stated.",
      "We are not responsible for the practices, policies, content, or services of any third-party platform.",
    ],
  },
  {
    icon: Heart,
    title: "6. Responsible Gaming",
    content: [
      "Realgameapps strongly encourages responsible gaming at all times.",
      "Set strict budget and time limits before each session — never play with money you cannot afford to lose.",
      "Do not chase losses. Accept variance as part of real-money gaming.",
      "If you or someone you know is struggling with gaming addiction, please seek help from a qualified professional.",
      "Most licensed Realgameappsplatforms in India offer self-exclusion, deposit limits, and cooling-off features. Use them if needed.",
    ],
  },
  {
    icon: CheckCircle,
    title: "7. Accuracy of Information",
    content: [
      "We strive to keep all content accurate, complete, and up to date. However, Realgameappsplatforms frequently change their bonus offers, app features, and terms.",
      "Realgameapps makes no warranties regarding the completeness, reliability, or current accuracy of any specific data point on this site.",
      "Bonus amounts, download links, rating scores, and promotional details should be verified directly with the relevant app provider before acting on them.",
      "We are not liable for decisions made based on outdated or inaccurate information published on this website.",
    ],
  },
  {
    icon: Scale,
    title: "8. Limitation of Liability",
    content: [
      "Realgameapps, its owners, editors, contributors, and affiliates shall not be held liable for:",
      "Direct, indirect, incidental, consequential, or punitive damages of any kind arising from your use of this website.",
      "Financial losses, winnings disputes, or account issues incurred on any third-party Realgameappsplatform.",
      "Technical failures, data loss, or inaccessibility of any app or service linked from this site.",
      "Reliance on any information, rating, bonus data, or strategy content published here.",
      "This limitation applies to the fullest extent permitted under applicable Indian law.",
    ],
  },
];

const Disclaimer = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Disclaimer | Realgameapps",
      url: `${SITE_URL}/disclaimer`,
      description: "Read the Realgameapps disclaimer. Informational use only. No guarantee of winnings. 18+ only. Check local laws.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Disclaimer", item: `${SITE_URL}/disclaimer` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Disclaimer | Realgameapps"
        description="Read the disclaimer for Realgameapps. This site is for informational purposes only. We do not promote gambling or guarantee winnings. 18+ only."
        keywords="Realgameapps disclaimer, Realgameappswebsite disclaimer, informational purposes only rummy, responsible gaming india, 18+ Realgameappsdisclaimer"
        type="article"
        path="/disclaimer"
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
              <span className="text-primary-foreground">Disclaimer</span>
            </nav>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-4xl font-extrabold text-primary-foreground">Disclaimer</h1>
            <p className="text-primary-foreground/70 mt-2 text-sm">Last updated: April 2025</p>
          </motion.div>
        </div>
      </section>

      <main className="container py-12 max-w-3xl">
        {/* Alert banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-500/8 border border-amber-500/25 rounded-2xl p-6 mb-8 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> Realgameapps is an independent review and comparison website. We do not operate any Realgameappsplatform, process payments, or guarantee any gaming outcomes. All real-money gaming carries financial risk. Play responsibly. <strong className="text-foreground">18+ only.</strong>
          </p>
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
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="font-heading font-bold text-foreground text-lg">{s.title}</h2>
              </div>
              <ul className="space-y-1.5">
                {s.content.map((line, j) => (
                  <li key={j} className={`text-sm leading-relaxed ${j === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {j > 0 && <span className="text-amber-500 mr-1.5">•</span>}{line}
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
          <Link to="/terms" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Terms of Use</p>
              <p className="text-xs text-muted-foreground">Rules for using Realgameapps</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </Link>
        </div>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default Disclaimer;
