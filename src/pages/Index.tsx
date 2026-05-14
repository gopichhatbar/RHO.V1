import { useState, useMemo } from "react";
//////lazy loading for better performence 
import { lazy, Suspense } from "react";
const Header = lazy(() => import("@/components/Header"));
const HeroSection = lazy(() => import("@/components/HeroSection"));
const CategoryTabs = lazy(() => import("@/components/CategoryTabs"));
const AppCard = lazy(() => import("@/components/AppCard"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingSocial = lazy(() => import("@/components/FloatingSocial"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
import SEO, { SITE_URL } from "@/components/SEO";
import { rummyApps } from "@/data/rummyApps";
import { motion } from "framer-motion";
import { TrendingUp, SearchX } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from "@/hooks/use-debounce";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { query, setQuery } = useSearch();
  const debouncedQuery = useDebounce(query, 250);
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially
  const [isOpen, setIsOpen] = useState(false);
  

  const filteredApps = useMemo(() => {
    const base =
      activeCategory === "all"
        ? rummyApps
        : rummyApps.filter((app) => app.category.includes(activeCategory));

    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return base;

    return base.filter((app) => {
      const haystack = [
        app.name,
        app.tagline,
        app.description,
        ...(app.gameTypes ?? []),
        ...(app.paymentMethods ?? []),
        ...(app.platforms ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, debouncedQuery]);

  const visibleApps = filteredApps.slice(0, 6);
const extraApps = filteredApps.slice(6);

  const itemListJsonLd = [
  // 🏢 Organization (Trust signal)
  ////this is for Who owns the website
  // What your brand is
  // What your site does
  // Your official logo
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Realgameapps",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      "Compare and download India's best Realgameappss with verified reviews and real cash bonuses.",
  },

  // 🌐 Website
//   This is a website (not just a page)
// The site name is Realgameapps
// The main URL is your domain
// The content language is English (India)
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Realgameapps",
    url: SITE_URL,
    inLanguage: "en-IN",
  },

  // 📊 App Listing (your existing one improved)
  //   It tells Google this page has a list of Realgameappss.
// It shows the order or ranking of each app.
// It helps your page rank for “best Realgameappss.”
// It makes your page easier for Google to understand.
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: rummyApps.map((app, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/${app.slug}`,
      name: app.name,
    })),
  },
  
];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="All Realgameappss in India 2025 — Reviews, Bonuses & Downloads | Realgameapps"
        description="Discover, compare and download India's best Realgameappss. Verified reviews, exclusive bonuses up to ₹10,000, instant withdrawals. Trusted by 10M+ players."
        ///added
        keywords="Realgameappss india, best Realgameappss, real cash rummy, online Realgameappss india"
        type="website"
        path="/"
        jsonLd={itemListJsonLd}
      />
      
      <Header />
      <HeroSection />
      <FloatingSocial />

      <main className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <TrendingUp className="w-5 h-5 text-secondary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">All Realgameappss in India</h2>
          <span className="ml-auto px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
            {filteredApps.length} Apps
          </span>
        </motion.div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div id="apps-grid" className="mt-8">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleApps.map((app, i) => (
  <AppCard key={app.id} app={app} index={i} />
))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl bg-muted/40 border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                <SearchX className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                No apps match your search
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mb-5">
                {query
                  ? <>We couldn't find any Realgameappss matching <span className="font-semibold text-foreground">"{query}"</span>. Try a different keyword or clear your filters.</>
                  : "No apps found for the selected category."}
              </p>
              <div className="flex gap-3">
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Clear search
                  </button>
                )}
                {activeCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className="h-10 px-4 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Show all apps
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
          <div className="flex justify-center mt-10">
  <div className="flex justify-center mt-10">
  {extraApps.length > 0 && (
    <button
      onClick={() => setIsOpen(true)}
      className="bg-primary text-primary-foreground py-2 px-8 rounded-lg text-sm font-semibold hover:opacity-90 transition"
    >
      Show More
    </button>
  )}
</div>
</div>
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    
    <div className="bg-background w-[90%] max-w-5xl max-h-[80vh] rounded-2xl p-6 overflow-y-auto relative">
      
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-sm bg-muted px-3 py-1 rounded"
      >
        Close ✕
      </button>

      <h2 className="text-xl font-bold mb-4">More Apps</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {extraApps.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} />
        ))}
      </div>
    </div>
  </div>
)}
      </main>
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
