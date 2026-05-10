import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Download, Gift, ArrowLeft, Shield, Smartphone, CreditCard, Gamepad, ThumbsUp, ThumbsDown, Share2, MessageCircle, Send, Calendar, Users, ChevronRight } from "lucide-react";
import { getAppBySlug, rummyApps } from "@/data/rummyApps";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const AppCard = lazy(() => import("@/components/AppCard"));
import SEO, { SITE_URL } from "@/components/SEO";

/** Convert "1.2M" / "980K" to a numeric ratingCount for schema.org */
const parseReviews = (reviews: string): number => {
  const num = parseFloat(reviews);
  if (Number.isNaN(num)) return 0;
  if (/M/i.test(reviews)) return Math.round(num * 1_000_000);
  if (/K/i.test(reviews)) return Math.round(num * 1_000);
  return Math.round(num);
};

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = getAppBySlug(slug || "");

  if (!app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SEO
          title="App Not Found | Realgameapps"
          description="We couldn't find that Realgameapps. Browse all verified Realgameappss on Realgameapps."
          path={`/app/${slug ?? ""}`}
          noindex
        />
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">App Not Found</h1>
          <Link to="/" className="text-primary font-medium text-sm hover:underline">← Back to all apps</Link>
        </div>
      </div>
    );
  }

  const relatedApps = rummyApps.filter((a) => a.id !== app.id).slice(0, 3);
  const ratingCount = parseReviews(app.reviews);
  const path = `/${app.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "GameApplication",
    operatingSystem: app.platforms.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: app.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: ratingCount || 1,
      reviewCount: ratingCount || 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: app.rating,
        bestRating: 5,
      },
      author: { "@type": "Organization", name: "Realgameapps Editorial" },
      reviewBody: app.description,
      positiveNotes: { "@type": "ItemList", itemListElement: app.pros.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p })) },
      negativeNotes: { "@type": "ItemList", itemListElement: app.cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })) },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Apps", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 3, name: app.name, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${app.name} Review ${app.established ? "" : ""}— Bonus ${app.maxBonus}, Rating ${app.rating}/5 | Realgameapps`}
        description={`${app.name}: ${app.tagline}. Welcome bonus ${app.maxBonus}, min withdrawal ${app.minWithdraw}. Read our full review with pros, cons, payment methods and more.`}
        path={path}
        type="product"
        ////added forr for better seo
        keywords={`${app.name} review, ${app.name} bonus, ${app.name} download, ${app.name} app india, play ${app.name}, ${app.name} real cash rummy`}

        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <Header />

      {/* Hero Banner */}
      <div className={`bg-gradient-to-r ${app.color} py-12 md:py-16`}>
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all apps
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground font-heading font-bold text-3xl md:text-4xl shadow-xl border border-primary-foreground/10`}>
              {app.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground">{app.name}</h1>
                {app.featured && (
                  <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-bold backdrop-blur-sm">⭐ Featured</span>
                )}
              </div>
              <p className="text-primary-foreground/80 text-base mb-3">{app.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(app.rating) ? "fill-primary-foreground text-primary-foreground" : "text-primary-foreground/30"}`} />
                  ))}
                  <span className="text-sm font-bold text-primary-foreground ml-1">{app.rating}</span>
                  <span className="text-xs text-primary-foreground/60 ml-1">({app.reviews} reviews)</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-primary-foreground/70"><Calendar className="w-3.5 h-3.5" /> Est. {app.established}</span>
                <span className="flex items-center gap-1 text-xs text-primary-foreground/70"><Users className="w-3.5 h-3.5" /> {app.reviews} players</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="h-12 px-8 rounded-xl bg-primary-foreground text-foreground font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                <Download className="w-4 h-4" /> Download
              </button>
              <button className="h-12 w-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">About {app.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{app.description}</p>
            </motion.section>

            {/* Pros & Cons */}
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                <h3 className="font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                  <ThumbsUp className="w-4 h-4 text-accent" /> Pros
                </h3>
                <ul className="space-y-2.5">
                  {app.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                <h3 className="font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                  <ThumbsDown className="w-4 h-4 text-destructive" /> Cons
                </h3>
                <ul className="space-y-2.5">
                  {app.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5 text-xs">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Game Types */}
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Gamepad className="w-5 h-5 text-primary" /> Games Tag
              </h2>
              <div className="flex flex-wrap gap-2">
                {app.gameTypes.map((game) => (
                  <span key={game} className="px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium">{game}</span>
                ))}
              </div>
            </motion.section>

            {/* Share Section */}
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-hero rounded-2xl p-6 text-center">
              <h3 className="font-heading font-bold text-primary-foreground text-lg mb-2">Share {app.name} with friends</h3>
              <p className="text-primary-foreground/70 text-xs mb-4">Earn referral bonus of {app.referralBonus} per friend!</p>
              <div className="flex items-center justify-center gap-3">
                <a href={`https://wa.me/?text=Check out ${app.name}!`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity shadow-lg">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href={`https://t.me/share/url?text=Check out ${app.name}!`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity shadow-lg">
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Stats Card */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-heading font-bold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-3.5">
                {[
                  { icon: Gift, label: "Welcome Bonus", value: app.maxBonus, color: "text-secondary" },
                  { icon: Gift, label: "Referral Bonus", value: app.referralBonus, color: "text-primary" },
                  { icon: CreditCard, label: "Min. Withdraw", value: app.minWithdraw, color: "text-accent" },
                  { icon: Calendar, label: "Established", value: app.established, color: "text-muted-foreground" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                <Smartphone className="w-4 h-4 text-primary" /> Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {app.platforms.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{p}</span>
                ))}
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-secondary" /> Payment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {app.paymentMethods.map((pm) => (
                  <span key={pm} className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium">{pm}</span>
                ))}
              </div>
            </motion.div>

            {/* Safety Badge */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-accent/10 rounded-2xl border border-accent/20 p-5 text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
              <h4 className="font-heading font-bold text-foreground text-sm mb-1">Verified & Safe</h4>
              <p className="text-muted-foreground text-xs">This app has been reviewed and verified by our team for fair play and security.</p>
            </motion.div>

            {/* CTA */}
            <button className="w-full h-12 py-3.5 rounded-xl bg-gradient-hero text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-hero">
              <Download className="w-4 h-4" /> Download {app.name}
            </button>
          </div>
        </div>

        {/* Related Apps */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">Similar Apps</h2>
            <Link to="/" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedApps.map((a, i) => (
              <AppCard key={a.id} app={a} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AppDetail;
