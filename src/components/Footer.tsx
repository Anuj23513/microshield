import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">E</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Micro<span className="gradient-text">shield</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {[{ to: "/", l: "Home" }, { to: "/products", l: "Products" }, { to: "/about", l: "About Us" }, { to: "/contact", l: "Contact" }].map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-primary transition-colors">{link.l}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Excellence Impex Trading Co.</span>
            <Link to="/admin/login" className="hover:text-primary transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
