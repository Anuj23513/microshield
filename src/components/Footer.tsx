import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">E</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                Micro<span className="gradient-text">shield</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              Excellence Impex Trading Co. — India's leading supplier of Microshield Liquid Glass Screen Protector and accessories.
            </p>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Excellence Impex Trading Co. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[{ to: "/", l: "Home" }, { to: "/products", l: "Products" }, { to: "/about", l: "About Us" }, { to: "/contact", l: "Contact" }].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{contactInfo.address}</span>
              </a>
              <a href={`tel:${contactInfo.whatsapp}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /><span>{contactInfo.whatsapp}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" /><span>{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
