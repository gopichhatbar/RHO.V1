import { motion } from "framer-motion";
import { Search, Star, Shield, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import heroTrophy from "@/assets/hero-trophy.png";
import { useSearch } from "@/context/SearchContext";

const HeroSection = () => {
  const { query, setQuery } = useSearch();

  const handleFindApps = () => {
    const grid = document.getElementById("apps-grid");

    if (grid) {
      grid.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          Best Poker Apps in India 2026 | Real Money Gaming Apps
        </title>

        <meta
          name="description"
          content="Discover the best real money poker apps in India with instant withdrawal, secure payments, signup bonuses, and trusted online card games."
        />

        <meta
          name="keywords"
          content="best poker apps india, real money poker apps, poker games india, teen patti apps, rummy apps, online cash games, trusted gaming apps"
        />

        <meta
          property="og:title"
          content="Best Poker Apps in India 2026"
        />

        <meta
          property="og:description"
          content="Explore trusted real money poker apps with secure gameplay and fast withdrawals."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://yourdomain.com/hero-banner.jpg"
        />

        <meta
          property="og:url"
          content="https://yourdomain.com"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Real Game Apps",
            url: "https://yourdomain.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://yourdomain.com/search?q={search_term_string}",
              "query-input":
                "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-hero py-16 md:py-24"
        aria-label="Best Poker Apps in India"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/3" />

        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/3" />

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">

              <header>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Trust Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium mb-5 backdrop-blur-sm border border-primary-foreground/10">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Trusted by 10M+ Players
                  </span>

                  {/* Main Heading */}
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-5">
                    Best Poker Apps
                    <br />
                    <span className="opacity-80">
                      in India 2026
                    </span>
                  </h1>

                  {/* SEO Description */}
                  <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto lg:mx-0 mb-8">
                    Discover top real money poker apps in India
                    with instant withdrawals, secure payments,
                    signup bonuses, and trusted online card games.
                  </p>
                </motion.div>
              </header>

              {/* Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto lg:mx-0"
              >
                <div className="relative flex-1 w-full">
                  <label
                    htmlFor="hero-search"
                    className="sr-only"
                  >
                    Search Poker Apps
                  </label>

                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />

                  <input
                    id="hero-search"
                    type="search"
                    value={query}
                    onChange={(e) =>
                      setQuery(e.target.value)
                    }
                    placeholder="Search poker apps..."
                    autoComplete="off"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleFindApps}
                  aria-label="Find Best Poker Apps"
                  className="h-12 px-6 rounded-xl bg-gradient-gold text-gold-foreground font-semibold text-sm hover:opacity-90 transition-all duration-300 whitespace-nowrap"
                >
                  Find Poker Apps
                </button>
              </motion.div>

              {/* Trust Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-primary-foreground/70 text-xs font-medium flex-wrap"
              >
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  100% Legal
                </span>

                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Instant Withdrawals
                </span>

                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" />
                  Verified Apps
                </span>
              </motion.div>

              {/* Hidden SEO Keywords */}
              <div className="sr-only">
                poker apps india, real cash poker apps,
                online poker games, teen patti apps,
                rummy apps, trusted gaming apps,
                legal betting apps india,
                instant withdrawal apps
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="hidden lg:block"
            >
              <img
                src={heroTrophy}
                alt="Best Poker Apps India Trophy"
                title="Top Real Money Poker Apps"
                width={320}
                height={320}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="animate-float drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;