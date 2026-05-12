import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAppBySlug, rummyApps } from "@/data/rummyApps";
import { withdrawalSteps, faqs, bonusDetails, withdrawalHighlights, shareLinks } from "@/data/apppage";
import { parseReviews } from "@/utils/appHelpers";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < full
              ? "text-yellow-400 text-lg"
              : i === full && half
              ? "text-yellow-300 text-lg"
              : "text-gray-200 text-lg"
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
};

// Helper function to generate slug for related apps
const generateAppSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 py-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border rounded-xl p-5 mb-3">
        <div className="flex gap-5">
          <div className="w-24 h-24 bg-gray-200 rounded-2xl"></div>
          <div className="flex-1">
            <div className="h-7 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mb-2"></div>
          </div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white border rounded-xl p-5">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white border rounded-xl p-5">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function TeenPattiPage() {
  const { slug } = useParams<{ slug: string }>();
  const [app, setApp] = useState(getAppBySlug(slug || ""));
  const [isLoading, setIsLoading] = useState(true);
  const [descOpen, setDescOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // 1-second load function with skeleton
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Exactly 1 second delay

    return () => clearTimeout(loadTimer);
  }, []);

  // Update app when slug changes
  useEffect(() => {
    const newApp = getAppBySlug(slug || "");
    setApp(newApp);
    // Reset loading state for new app
    setIsLoading(true);
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadTimer);
  }, [slug]);

  // Track download analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && app && !isLoading) {
      window.gtag('event', 'page_view', {
        page_title: app.name,
        page_location: window.location.href,
        app_name: app.name,
        app_category: app.category.join(', ')
      });
    }
  }, [app, isLoading]);

  // Show loading skeleton for first second
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // 404 fallback
  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>App Not Found | Realgameapps</title>
          <meta name="description" content="The requested app could not be found. Browse our collection of verified real money gaming apps." />
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://realgameapps.com/" />
        </Helmet>
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">App Not Found</h1>
          <p className="text-gray-500 mb-5">We could not find that app. Browse all verified apps on Realgameapps.</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors inline-block"
            aria-label="Back to home page"
          >
            Back to all apps
          </Link>
        </div>
      </div>
    );
  }

  const relatedApps = rummyApps.filter((a) => a.id !== app.id).slice(0, 5);
  const ratingCount = parseReviews(app.reviews);
  const siteUrl = "https://realgameapps.com";
  const pageUrl = `${siteUrl}/${app.slug}`;
  const currentYear = new Date().getFullYear();
  
  // Extract unique game types
  const uniqueGameTypes = [...new Set(app.gameTypes)];

  // Handle download with tracking
  const handleDownload = () => {
    setDownloading(true);
    
    // Track download event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_click', {
        app_name: app.name,
        app_slug: app.slug,
        app_category: app.category.join(', '),
        event_category: 'engagement',
        event_label: 'apk_download'
      });
    }
    
    setTimeout(() => {
      window.open(app.downloadUrl, "_blank", "noopener noreferrer");
      setDownloading(false);
    }, 800);
  };

  // Handle image error
  const handleImageError = (imgSrc: string) => {
    setImageErrors(prev => new Set(prev).add(imgSrc));
  };

  // Schema Markup - Software Application
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "description": app.description,
    "url": pageUrl,
    "applicationCategory": "GameApplication",
    "operatingSystem": app.platforms.join(", "),
    "offers": { 
      "@type": "Offer", 
      "price": "0", 
      "priceCurrency": "INR", 
      "availability": "https://schema.org/InStock",
      "priceValidUntil": `${currentYear + 1}-12-31`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": app.rating.toString(),
      "ratingCount": ratingCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": { "@type": "Organization", "name": app.name },
    "softwareVersion": "2025.1",
    "fileSize": "50MB",
    "keywords": app.gameTypes.join(", "),
    "datePublished": app.established ? `${app.established}-01-01` : "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "requirements": "Android 5.0 or later, 2GB RAM minimum",
    "screenshot": app.images || [],
    "downloadUrl": app.downloadUrl,
    "installUrl": app.downloadUrl,
    "releaseNotes": `Latest version with improved performance and ${app.bonus} welcome bonus`
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": app.category[0] || "Gaming Apps",
        "item": `${siteUrl}/${app.category[0]?.toLowerCase() || 'gaming'}-apps`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": app.name,
        "item": pageUrl
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // How-To Schema for Withdrawal Process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to withdraw money from ${app.name}`,
    "description": `Step-by-step guide to withdraw your winnings from ${app.name}. Minimum withdrawal ${app.minWithdraw}.`,
    "totalTime": "PT24H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "0"
    },
    "step": withdrawalSteps.map((step) => ({
      "@type": "HowToStep",
      "name": step.title,
      "text": step.desc,
      "position": step.step
    }))
  };

  // Generate meta description (150-160 characters)
  const metaDescription = `Download ${app.name} APK v2025. Get ${app.bonus} welcome bonus + ${app.referralBonus} per referral. Fast withdrawals from ${app.minWithdraw}. Trusted by ${app.reviews}+ users. 100% safe APK.`;

  // Generate meta title (50-60 characters)
  const metaTitle = `${app.name} APK Download ${currentYear} | ${app.bonus} Bonus & Instant Withdrawal`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* SEO HEAD - Enhanced */}
      <Helmet>
        {/* Basic Meta Tags */}
        <html lang="en" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${app.name}, ${app.name} APK download, ${app.name} bonus, ${app.gameTypes.slice(0, 4).join(", ")}, real money game India, ${app.name} withdrawal, rummy app, teen patti app`} />
        <meta name="author" content="Realgameapps" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Hreflang Tags */}
        <link rel="alternate" href={pageUrl} hrefLang="en" />
        <link rel="alternate" href={`${siteUrl}/hi/${app.slug}`} hrefLang="hi" />
        <link rel="alternate" href={pageUrl} hrefLang="x-default" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={app.description.substring(0, 200)} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Realgameapps" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={app.images && app.images[0] ? app.images[0] : `${siteUrl}/default-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${app.name} app interface and gameplay screenshot`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={app.description.substring(0, 180)} />
        <meta name="twitter:image" content={app.images && app.images[0] ? app.images[0] : `${siteUrl}/default-image.jpg`} />
        <meta name="twitter:site" content="@realgameapps" />
        <meta name="twitter:creator" content="@realgameapps" />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content={app.name} />
        <meta name="apple-mobile-web-app-title" content={app.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org Scripts */}
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      {/* HEADER with Skip to Content for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>
      
      <Suspense fallback={<div className="h-16 bg-white" aria-label="Loading header"></div>}>
        <Header />
      </Suspense>

      {/* BREADCRUMB with microdata */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 text-xs" aria-label="Breadcrumb">
        <ol className="max-w-5xl mx-auto flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-blue-600 text-gray-500 transition-colors" aria-label="Home">
              Home
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">/</li>
          <li>
            <Link to={`/${app.category[0]?.toLowerCase()}-apps`} className="hover:text-blue-600 text-gray-500 transition-colors">
              {app.category[0]} Apps
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">/</li>
          <li>
            <span className="text-gray-700 font-medium" aria-current="page">
              {app.name}
            </span>
          </li>
        </ol>
      </nav>

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-4 space-y-3">
        {/* APP HEADER CARD */}
        <section aria-labelledby="app-header-title">
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row gap-5">
            {/* Logo */}
            <div className="flex-shrink-0">
              {app.logo && !app.logo.startsWith("href=") && !imageErrors.has(app.logo) ? (
                <img
                  src={app.logo}
                  alt={`${app.name} official logo - download ${app.name} APK`}
                  className="w-24 h-24 rounded-2xl object-cover border border-gray-200 shadow"
                  width="96"
                  height="96"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => handleImageError(app.logo)}
                />
              ) : null}
              <div
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center border border-gray-200 shadow ${app.logo && !app.logo.startsWith("href=") && !imageErrors.has(app.logo) ? "hidden" : "flex"}`}
                aria-label={`${app.name} app icon`}
              >
                <span className="text-4xl" aria-hidden="true">🎮</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 id="app-header-title" className="text-xl font-bold text-gray-900 leading-tight">
                {app.name} <span className="text-sm font-normal text-gray-400">APK Download {currentYear}</span>
              </h1>

              <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
                {app.category.map((cat) => (
                  <span key={cat} className="inline-block bg-blue-600 text-white text-[10px] px-2.5 py-0.5 rounded capitalize" aria-label={`Category: ${cat}`}>
                    {cat}
                  </span>
                ))}
                {app.gameTypes.slice(0, 2).map((g) => (
                  <span key={g} className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2.5 py-0.5 rounded" aria-label={`Game type: ${g}`}>
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm mb-3 max-w-xl leading-relaxed">{app.tagline}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs mb-3">
                {[
                  [app.name, "Developer"],
                  [app.established, "Established"],
                  [app.minWithdraw, "Min Withdrawal"],
                  [app.maxBonus, "Max Bonus"],
                  [app.platforms.join(" / "), "Platform"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-900 text-sm">{val}</div>
                    <div className="text-gray-400 text-xs">{label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-3">
                {renderStars(app.rating)}
                <span className="font-bold text-yellow-500 text-lg">{app.rating}</span>
                <span className="text-gray-400 text-xs">/5 · <span>{app.reviews}</span> user reviews</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-150 shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  aria-label={`Download ${app.name} APK for free. Size approximately 50MB`}
                  aria-busy={downloading}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <span className="inline-block animate-pulse">✓</span> Opening Download...
                    </>
                  ) : (
                    <>
                      ⬇ Download APK ({app.platforms.includes("Android") ? "Android" : "Mobile"})
                    </>
                  )}
                </button>
                <a 
                  href="https://t.me/realgameapps" 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="border border-[#0088cc] text-[#0088cc] hover:bg-blue-50 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2 focus:outline-none"
                  aria-label="Join our Telegram channel for updates"
                >
                  ✈ Join Telegram
                </a>
              </div>
              <span className="text-xs text-gray-400 mt-2 block">ℹ Play responsibly. 18+ only. Terms apply.</span>
            </div>
          </div>
        </section>

        {/* SHARE BAR */}
        <section aria-label="Share this app">
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">Share this app:</span>
            {shareLinks.map(({ label, url }) => (
              <a
                key={label}
                href={url(pageUrl, app.name)}
                target="_blank"
                rel="noopener noreferrer nofollow external"
                className="border border-gray-200 text-xs px-3 py-1.5 rounded hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label={`Share ${app.name} on ${label}`}
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-3">
            {/* Description */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                About {app.name}
              </h2>
              <div className={`text-sm text-gray-600 leading-relaxed space-y-2 overflow-hidden transition-all duration-300 ${descOpen ? "max-h-[999px]" : "max-h-24"}`}>
                <p>{app.description}</p>
                <p>
                  <strong className="text-gray-800">{app.name}</strong> is a trusted real-money gaming platform available on {app.platforms.join(", ")}. 
                  The app offers exciting {app.gameTypes.slice(0, 4).join(", ")} games with a generous welcome bonus of up to <strong className="text-gray-800">{app.maxBonus}</strong> and 
                  a minimum withdrawal of just <strong className="text-gray-800">{app.minWithdraw}</strong>, making it one of the most accessible platforms in India.
                </p>
                <p>
                  Established in <strong className="text-gray-800">{app.established}</strong>, this platform has built a strong reputation for fast payouts and 
                  excellent customer support. It supports multiple payment options including {app.paymentMethods.join(", ")}, 
                  ensuring convenient deposits and withdrawals. The referral program rewards you with <strong className="text-gray-800">{app.referralBonus}</strong> for every friend you invite.
                </p>
              </div>
              <button 
                onClick={() => setDescOpen(!descOpen)} 
                className="text-blue-600 text-xs mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-expanded={descOpen}
                aria-label={descOpen ? "Show less description" : "Read full description"}
              >
                {descOpen ? "Show less ▲" : "Read more ▼"}
              </button>
            </section>

            {/* Pros & Cons */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-green-500 pb-2 mb-4">
                Pros & Cons Analysis
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span aria-hidden="true">✅</span> Advantages
                  </h3>
                  <ul className="space-y-2">
                    {app.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span aria-hidden="true">⚠️</span> Considerations
                  </h3>
                  <ul className="space-y-2">
                    {app.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true">✗</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Game Types */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                Available Game Types
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueGameTypes.map((g) => (
                  <span key={g} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    <span aria-hidden="true">🎮</span> {g}
                  </span>
                ))}
              </div>
            </section>

            {/* Payment Methods */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                Supported Payment Methods
              </h2>
              <div className="flex flex-wrap gap-2">
                {app.paymentMethods.map((pm) => (
                  <span key={pm} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span aria-hidden="true">💳</span> {pm}
                  </span>
                ))}
              </div>
            </section>

            {/* Bonus Details */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-green-500 pb-2 mb-4">
                🎁 Exclusive Bonus Offer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bonusDetails.map((b) => (
                  <div key={b.title} className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-green-50 to-white flex gap-3 items-start">
                    <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{b.title}</div>
                      <div className="text-green-600 font-extrabold text-lg leading-tight">{app[b.key as keyof typeof app]}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">*Bonus terms apply. All bonuses are credited to in-game wallet. Play responsibly.</p>
            </section>

            {/* Withdrawal Process */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-yellow-400 pb-2 mb-4">
                💸 Withdrawal Process
              </h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {withdrawalHighlights.map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span aria-hidden="true">{b.icon}</span> {b.label}
                  </span>
                ))}
              </div>
              <div className="space-y-4 mb-5">
                {withdrawalSteps.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-white text-sm shadow" aria-label={`Step ${s.step}`}>
                      {s.step}
                    </div>
                    <div className="pt-1">
                      <div className="font-bold text-gray-800 text-sm">{s.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-xs text-center">
                  <thead className="bg-gray-50 text-gray-500 font-semibold">
                    <tr>
                      <th className="py-2 px-3 text-left">Method</th>
                      <th className="py-2 px-3">Min</th>
                      <th className="py-2 px-3">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-700">
                    {app.paymentMethods.map((method) => (
                      <tr key={method} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2 px-3 font-medium text-left">
                          <span aria-hidden="true">💳</span> {method}
                        </td>
                        <td className="py-2 px-3 text-green-600 font-semibold">{app.minWithdraw}</td>
                        <td className="py-2 px-3 text-blue-600 font-medium">2-24 hours</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* App Screenshots */}
            {app.images && app.images.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-5">
                  App Screenshots & Interface
                </h2>
                <div
                  className={`
                    grid gap-5
                    ${
                      app.images.length === 1
                        ? "grid-cols-1"
                        : app.images.length === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }
                  `}
                >
                  {app.images.map((img: string, index: number) => (
                    !imageErrors.has(img) && (
                      <a
                        key={`${img}-${index}`}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-lg"
                      >
                        <img
                          src={img}
                          alt={`${app.name} screenshot ${index + 1}`}
                          className="w-full h-auto object-contain min-h-[250px] max-h-[750px] transition-all duration-300 hover:scale-[1.02]"
                          width="400"
                          height="800"
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImageError(img)}
                        />
                      </a>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                ❓ Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-sm text-gray-800 pr-4">{faq.q}</span>
                      <span className="text-blue-500 text-xl flex-shrink-0 font-light">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 pt-3 text-sm text-gray-500 leading-relaxed border-t border-gray-100 bg-blue-50/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-3">
            {/* App Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                App Info
              </h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["App Name", app.name],
                    ["Developer", app.name],
                    ["Established", app.established],
                    ["Rating", `${app.rating} / 5`],
                    ["Reviews", app.reviews],
                    ["Platform", app.platforms.join(", ")],
                    ["Min Withdraw", app.minWithdraw],
                    ["Max Bonus", app.maxBonus],
                    ["Referral Bonus", app.referralBonus],
                    ["Price", "Free"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2 font-semibold text-gray-700 w-2/5 pr-2 text-xs">{k}</td>
                      <td className="py-2 text-gray-500 text-xs">{v}</td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>

            {/* Welcome Bonus CTA */}
            <div className={`bg-gradient-to-br ${app.color} rounded-xl p-5 text-white`}>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">🎁 Welcome Bonus</div>
              <div className="text-4xl font-black mb-1">{app.bonus}</div>
              <div className="text-sm opacity-90 mb-4 leading-snug">Free on registration — no deposit needed!</div>
              <button
                onClick={handleDownload}
                className="w-full bg-white text-gray-800 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-50 active:scale-95 transition-all shadow"
                disabled={downloading}
              >
                {downloading ? "✓ Opening..." : "⬇ Claim & Download"}
              </button>
            </div>

            {/* Platforms */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                Platforms
              </h2>
              <div className="flex flex-wrap gap-2">
                {app.platforms.map((p) => (
                  <span key={p} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {p === "Android" ? "🤖" : p === "iOS" ? "🍎" : "🌐"} {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Apps */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">
                Related Apps
              </h2>
              <div className="divide-y divide-gray-50">
                {relatedApps.map((a) => (
                  <Link 
                    to={`/${a.slug || generateAppSlug(a.name)}`} 
                    key={a.id} 
                    className="flex items-center gap-3 py-3 group"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                      {a.logo && !a.logo.startsWith("href=") && !imageErrors.has(a.logo) ? (
                        <img 
                          src={a.logo} 
                          alt="" 
                          className="w-full h-full object-cover rounded-xl"
                          width="44"
                          height="44"
                          loading="lazy"
                          onError={() => handleImageError(a.logo)}
                        />
                      ) : (
                        <span className="text-xl">🎮</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.rating}★ · {a.bonus} bonus</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <Suspense fallback={<div className="h-32 bg-gray-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}