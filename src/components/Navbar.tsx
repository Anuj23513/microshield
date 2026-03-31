import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Moon, Phone, Shield } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { useContactInfo } from "@/hooks/use-site-settings";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const contactInfo = useContactInfo();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MicroShield Logo" className="h-10 w-10 rounded-full object-cover" width={40} height={40} />
          <span className="font-heading font-bold text-lg text-foreground">
            Micro<span className="gradient-text">shield</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            {isDark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <Link to="/admin/login" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors">
            <Shield className="w-4 h-4" /> Admin
          </Link>
          <a
            href={`https://wa.me/91${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium p-2 rounded-lg transition-colors ${
                    location.pathname === link.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`https://wa.me/91${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Phone className="w-4 h-4" /> WhatsApp Us
              </a>
              <Link to="/admin/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground p-2 rounded-lg hover:bg-secondary transition-colors">
                <Shield className="w-4 h-4" /> Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
