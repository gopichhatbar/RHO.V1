import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAppBySlug, rummyApps } from "@/data/rummyApps";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// ─── Helpers ─────────────────────────────────────────────────────────────────
const parseReviews = (reviews: string): number => {
  const num = parseFloat(reviews);
  if (Number.isNaN(num)) return 0;
  if (/M/i.test(reviews)) return Math.round(num * 1_000_000);
  if (/K/i.test(reviews)) return Math.round(num * 1_000);
  return Math.round(num);
};

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
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
        >
          ★
        </span>
      ))}
    </span>
  );
};

// ─── Static content ───────────────────────────────────────────────────────────
const withdrawalSteps = [
  { step: "01", title: "Go to Wallet", desc: "Tap the Wallet icon from the home screen and select 'Withdraw'." },
  { step: "02", title: "Choose Method", desc: "Select UPI, Paytm, PhonePe, or direct bank transfer." },
  { step: "03", title: "Enter Amount", desc: "Enter the amount above the minimum withdrawal limit." },
  { step: "04", title: "Confirm & Receive", desc: "Verify with OTP. Funds arrive within 24 hours (usually instant)." },
];

const faqs = [
  { q: "Is the app free to download?", a: "Yes! The app is completely free to download and install. No hidden charges or subscription fees." },
  { q: "Is my money safe on this platform?", a: "Yes. The platform uses SSL encryption and RNG-certified gameplay. Withdrawals are processed securely via UPI and bank transfer." },
  { q: "How do I claim the welcome bonus?", a: "Simply download the app, register an account, and the welcome bonus is credited instantly to your in-game wallet." },
  { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal varies by app — check the App Info section. Payouts are processed within 24 hours via UPI, Paytm, or bank transfer." },
  { q: "Can I play on iOS?", a: "Platform availability is listed in the App Info section. Most apps support Android; some also support iOS and Web." },
  { q: "Is this app legal in India?", a: "Skill-based gaming platforms are legal in most Indian states. Real-money gaming is restricted in Andhra Pradesh, Telangana, Assam, and Odisha." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function TeenPattiPage() {
  const { slug } = useParams<{ slug: string }>();
  const app = getAppBySlug(slug || "");

  const [descOpen, setDescOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 404 fallback
  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>App Not Found | Realgameapps</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">App Not Found</h1>
          <p className="text-gray-500 mb-5">We could not find that app. Browse all verified apps on Realgameapps.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: pageUrl,
    applicationCategory: "GameApplication",
    operatingSystem: app.platforms.join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR", availability: "https://schema.org/InStock" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: app.rating.toString(),
      ratingCount: ratingCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    author: { "@type": "Organization", name: app.name },
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.open(app.downloadUrl, "_blank", "noopener,noreferrer");
      setDownloading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* SEO HEAD */}
      <Helmet>
        <title>{`${app.name} APK Download 2025 – ${app.bonus} Bonus | Realgameapps`}</title>
        <meta name="description" content={`Download ${app.name} APK. ${app.tagline}. Get ${app.bonus} welcome bonus. Min withdrawal ${app.minWithdraw}. Available on ${app.platforms.join(", ")}.`} />
        <meta name="keywords" content={`${app.name}, ${app.name} APK download, ${app.name} bonus, ${app.gameTypes.slice(0, 3).join(", ")}, real money game India`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${app.name} APK – ${app.bonus} Welcome Bonus`} />
        <meta property="og:description" content={app.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={app.image} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${app.name} APK – ${app.bonus} Bonus`} />
        <meta name="twitter:description" content={app.description} />
        <meta name="twitter:image" content={app.image} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* HEADER */}
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      {/* BREADCRUMB */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-400">Apps</span>
        <span className="mx-1">/</span>
        <span className="text-gray-700 font-medium">{app.name}</span>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-4 space-y-3">

        {/* APP HEADER CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row gap-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            {app.logo && !app.logo.startsWith("href=") ? (
              <img
                src={app.logo}
                alt={`${app.name} logo`}
                className="w-24 h-24 rounded-2xl object-cover border border-gray-200 shadow"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  if (el.nextElementSibling) {
                    (el.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
            ) : null}
            <div
              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center border border-gray-200 shadow ${app.logo && !app.logo.startsWith("href=") ? "hidden" : "flex"}`}
            >
              <span className="text-4xl">🎮</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {app.name} <span className="text-sm font-normal text-gray-400">APK</span>
            </h1>

            <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
              {app.category.map((cat) => (
                <span key={cat} className="inline-block bg-blue-600 text-white text-[10px] px-2.5 py-0.5 rounded capitalize">{cat}</span>
              ))}
              {app.gameTypes.slice(0, 2).map((g) => (
                <span key={g} className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2.5 py-0.5 rounded">{g}</span>
              ))}
            </div>

            <p className="text-gray-500 text-sm mb-3 max-w-xl leading-relaxed">{app.tagline}</p>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs mb-3">
              {[
                [app.name, "Developer"],
                [app.established, "Est."],
                [app.minWithdraw, "Min Withdraw"],
                [app.maxBonus, "Max Bonus"],
                [app.platforms.join(" / "), "Platform"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="font-semibold text-gray-900 text-sm">{val}</div>
                  <div className="text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-3">
              {renderStars(app.rating)}
              <span className="font-bold text-yellow-500 text-lg">{app.rating}</span>
              <span className="text-gray-400 text-xs">/5 · {app.reviews} votes</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-150 shadow"
              >
                {downloading ? "✓ Opening..." : "⬇ Download APK"}
              </button>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
                className="border border-[#0088cc] text-[#0088cc] hover:bg-blue-50 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
                ✈ Telegram
              </a>
            </div>
            <span className="text-xs text-gray-400 mt-2 block">ℹ Play responsibly. 18+ only.</span>
          </div>
        </div>

        {/* SHARE BAR */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 mr-1">Share:</span>
          {[
            ["f Facebook", `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`],
            ["🐦 Twitter", `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=Check+out+${encodeURIComponent(app.name)}!`],
            ["✈ Telegram", `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(app.name)}`],
          ].map(([label, href]) => (
            <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer"
              className="border border-gray-200 text-xs px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-3">

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Description</h2>
              <h3 className="font-bold text-gray-900 mb-3">{app.name} – {app.tagline}</h3>
              <div className={`text-sm text-gray-500 leading-relaxed space-y-2 overflow-hidden transition-all duration-300 ${descOpen ? "max-h-[999px]" : "max-h-20"}`}>
                <p>{app.description}</p>
                <p>
                  <strong className="text-gray-700">{app.name}</strong> is available on {app.platforms.join(", ")},
                  offering {app.gameTypes.slice(0, 4).join(", ")} with a welcome bonus of up to <strong className="text-gray-700">{app.maxBonus}</strong> and
                  minimum withdrawal of just <strong className="text-gray-700">{app.minWithdraw}</strong>.
                </p>
                <p>
                  Active since <strong className="text-gray-700">{app.established}</strong>, this platform supports
                  {app.paymentMethods.join(", ")}. Invite friends and earn <strong className="text-gray-700">{app.referralBonus}</strong> per referral.
                </p>
              </div>
              <button onClick={() => setDescOpen(!descOpen)} className="text-blue-600 text-xs mt-2 hover:underline">
                {descOpen ? "Show less ▲" : "Read more ▼"}
              </button>
            </div>

            {/* Pros & Cons */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">✅ Pros</div>
                  <ul className="space-y-2">
                    {app.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">❌ Cons</div>
                  <ul className="space-y-2">
                    {app.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Game Types */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Game Types</h2>
              <div className="flex flex-wrap gap-2">
                {[...new Set(app.gameTypes)].map((g) => (
                  <span key={g} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    🎮 {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Payment Methods</h2>
              <div className="flex flex-wrap gap-2">
                {app.paymentMethods.map((pm) => (
                  <span key={pm} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    💳 {pm}
                  </span>
                ))}
              </div>
            </div>

            {/* Bonus Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-green-500 pb-2 mb-4">🎁 Bonus Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🎁", title: "Welcome Bonus", amount: app.bonus, desc: "Credited instantly on first registration. No deposit required." },
                  { icon: "🏆", title: "Max Bonus", amount: app.maxBonus, desc: "Maximum bonus available on this platform for new and active players." },
                  { icon: "👥", title: "Refer & Earn", amount: app.referralBonus, desc: "Invite friends and earn for each successful referral." },
                  { icon: "💸", title: "Min Withdrawal", amount: app.minWithdraw, desc: "Minimum amount needed to initiate a withdrawal from your wallet." },
                ].map((b) => (
                  <div key={b.title} className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-green-50 to-white flex gap-3 items-start">
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{b.title}</div>
                      <div className="text-green-600 font-extrabold text-lg leading-tight">{b.amount}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">* Bonus terms apply. All bonuses are credited to in-game wallet. Play responsibly.</p>
            </div>

            {/* Withdrawal Process */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-yellow-400 pb-2 mb-4">💸 Withdrawal Process</h2>
              <div className="flex flex-wrap gap-2 mb-5">
                {[{ icon: "⚡", label: "Instant Payouts" }, { icon: "🔒", label: "100% Secure" }, { icon: "🏦", label: "Bank / UPI" }, { icon: "✅", label: "Verified Users" }].map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
              <div className="space-y-4 mb-5">
                {withdrawalSteps.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-white text-sm shadow">
                      {s.step}
                    </div>
                    <div className="pt-1">
                      <div className="font-bold text-gray-900 text-sm">{s.title}</div>
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
                        <td className="py-2 px-3 font-medium text-left">💳 {method}</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">{app.minWithdraw}</td>
                        <td className="py-2 px-3 text-blue-600 font-medium">Instant – 24h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* App Banner Image */}
            {app.image && !app.image.startsWith("javascript:") && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">App Preview</h2>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <img
                    src={app.image}
                    alt={`${app.name} banner`}
                    className="w-full object-cover max-h-60"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.parentElement) el.parentElement.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
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
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-3">

            {/* App Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">App Info</h2>
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
              >
                {downloading ? "✓ Opening..." : "⬇ Claim & Download"}
              </button>
            </div>

            {/* Platforms */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Platforms</h2>
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
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b-2 border-blue-600 pb-2 mb-4">Related Apps</h2>
              <div className="divide-y divide-gray-50">
                {relatedApps.map((a) => (
                  <Link to={`/${a.slug}`} key={a.id} className="flex items-center gap-3 py-3 group">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                      {a.logo && !a.logo.startsWith("href=") ? (
                        <img src={a.logo} alt={a.name} className="w-full h-full object-cover rounded-xl"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
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

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
