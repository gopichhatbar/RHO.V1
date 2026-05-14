// ─── Static content (configurable) ─────────────────────────────────────────
// Withdrawal steps can be customized per app if needed


 export  const withdrawalSteps = [
  { step: "01", title: "Go to Wallet", desc: "Tap the Wallet icon from the home screen and select 'Withdraw'." },
  { step: "02", title: "Choose Method", desc: "Select UPI, Paytm, PhonePe, or direct bank transfer." },
  { step: "03", title: "Enter Amount", desc: "Enter the amount above the minimum withdrawal limit." },
  { step: "04", title: "Confirm & Receive", desc: "Verify with OTP. Funds arrive within 24 hours (usually instant)." },
];

// FAQ can be app-specific; here its static but could be passed as prop
export const faqs = [
  { q: "Is the app free to download?", a: "Yes! The app is completely free to download and install. No hidden charges or subscription fees." },
  { q: "Is my money safe on this platform?", a: "Yes. The platform uses SSL encryption and RNG-certified gameplay. Withdrawals are processed securely via UPI and bank transfer." },
  { q: "How do I claim the welcome bonus?", a: "Simply download the app, register an account, and the welcome bonus is credited instantly to your in-game wallet." },
  { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal varies by app — check the App Info section. Payouts are processed within 24 hours via UPI, Paytm, or bank transfer." },
  { q: "Can I play on iOS?", a: "Platform availability is listed in the App Info section. Most apps support Android; some also support iOS and Web." },
  { q: "Is this app legal in India?", a: "Skill-based gaming platforms are legal in most Indian states. Real-money gaming is restricted in Andhra Pradesh, Telangana, Assam, and Odisha." },
];

// Bonus details configuration
export  const bonusDetails = [
  { icon: "🎁", title: "Welcome Bonus", key: "bonus", desc: "Credited instantly on first registration. No deposit required." },
  { icon: "🏆", title: "Max Bonus", key: "maxBonus", desc: "Maximum bonus available on this platform for new and active players." },
  { icon: "👥", title: "Refer & Earn", key: "referralBonus", desc: "Invite friends and earn for each successful referral." },
  { icon: "💸", title: "Min Withdrawal", key: "minWithdraw", desc: "Minimum amount needed to initiate a withdrawal from your wallet." },
];

// Withdrawal highlights
export  const withdrawalHighlights = [
  { icon: "⚡", label: "Instant Payouts" },
  { icon: "🔒", label: "100% Secure" },
  { icon: "🏦", label: "Bank / UPI" },
  { icon: "✅", label: "Verified Users" },
];

// Share links configuration
export const shareLinks = [
  { label: "f Facebook", url: (u: string) => `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { label: "🐦 Twitter", url: (u: string, title?: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=Check+out+${encodeURIComponent(title || "")}!` },
  { label: "✈ Telegram", url: (u: string, title?: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(title || "")}` },
];
