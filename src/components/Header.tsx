import { Gamepad2, Menu, X } from "lucide-react";
import { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Gaming Blog", to: "/blog" },
  { label: "About Realgameapps", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        
        {/* Logo */}
        <Link
          to="/"
          aria-label="Realgameapps Home"
          title="Realgameapps - Gaming Apps Platform"
          className="flex items-center gap-2.5"
        >
          <div
            aria-label="Realgameapps Logo"
            className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md"
          >
            <Gamepad2 className="w-5 h-5 text-primary-foreground" />
          </div>

          {/* SEO Friendly Heading */}
          {location.pathname === "/" ? (
            <h1 className="font-heading font-bold text-xl text-foreground tracking-tight">
              Realgameapps
            </h1>
          ) : (
            <p className="font-heading font-bold text-xl text-foreground tracking-tight">
              Realgameapps
            </p>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                title={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-all duration-200 hover:text-foreground relative ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}

                {/* Active Underline */}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile Navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default memo(Header);