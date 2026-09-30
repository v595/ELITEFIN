import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <img src="/assets/logo-dark.svg" alt="EliteFin" className="h-10 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">{siteConfig.tagline}</p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Facebook, href: siteConfig.socialLinks.facebook },
                { icon: Instagram, href: siteConfig.socialLinks.instagram },
                { icon: Linkedin, href: siteConfig.socialLinks.linkedin },
                { icon: Twitter, href: siteConfig.socialLinks.twitter },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide uppercase text-gold-light">Car Loans</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/loans/new-car" className="hover:text-white">New Car Loan</Link></li>
              <li><Link to="/loans/used-car" className="hover:text-white">Used Car Loan</Link></li>
              <li><Link to="/loans/refinance" className="hover:text-white">Car Refinance</Link></li>
              <li><a href="/#emi-calculator" className="hover:text-white">EMI Calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide uppercase text-gold-light">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/reviews" className="hover:text-white">Reviews</Link></li>
              <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide uppercase text-gold-light">Support</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white break-all">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <Link to="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/legal/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/legal/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>

        <p className="text-white/35 text-[11px] leading-relaxed mt-6 max-w-4xl">
          {siteConfig.companyName} is a car-loan DSA/financial assistance platform. Final loan approval, interest
          rate, tenure, eligibility and terms are determined by the respective lender based on its policies and
          customer profile.
        </p>
      </div>
    </footer>
  );
}
