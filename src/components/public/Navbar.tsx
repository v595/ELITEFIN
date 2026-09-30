import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, PhoneCall } from "lucide-react";
import clsx from "clsx";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Car Loans", to: "/loans/new-car" },
  { label: "Used Car Loan", to: "/loans/used-car" },
  { label: "Refinance", to: "/loans/refinance" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md",
        scrolled ? "shadow-soft py-2" : "py-4"
      )}
    >
      <nav className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="EliteFin home">
          <img src="/assets/logo.svg" alt="EliteFin" className={clsx("transition-all duration-300", scrolled ? "h-9" : "h-11")} />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                    isActive ? "text-blue bg-blue/10" : "text-ink hover:text-blue hover:bg-blue/5"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button to="/contact" variant="gold" size="sm" icon={<PhoneCall size={16} />}>
            Get a Callback
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg text-primary hover:bg-primary/5"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden container-x pt-4 pb-2 animate-slide-up">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      "block px-4 py-3 rounded-xl text-base font-semibold",
                      isActive ? "text-blue bg-blue/10" : "text-ink hover:bg-primary/5"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" variant="gold" size="md" fullWidth className="mt-3" icon={<PhoneCall size={16} />}>
            Get a Callback
          </Button>
        </div>
      )}
    </header>
  );
}
