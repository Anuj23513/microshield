import { Link } from "react-router-dom";
import { useContactInfo } from "@/hooks/use-site-settings";
import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  const contactInfo = useContactInfo();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MicroShield Logo" className="h-8 w-auto" width={32} height={32} />
            <span className="font-heading font-bold text-lg text-foreground">
              Micro<span className="gradient-text">shield</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {[{ to: "/", l: "Home" }, { to: "/products", l: "Products" }, { to: "/about", l: "About Us" }, { to: "/contact", l: "Contact" }].map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-primary transition-colors">{link.l}</Link>
            ))}
          </div>

        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Excellence Impex Trading Co.</span>
          <Link to="/admin/login" className="hover:text-primary transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
