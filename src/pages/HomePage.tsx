import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Shield, Sparkles, Eye, Smartphone, Zap, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import productHero from "@/assets/product-hero.png";
import { features, testimonials } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" /> India's #1 Liquid Screen Protector
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight">
                Invisible <span className="gradient-text">Protection</span> for Your Screen
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg">
                Microshield Liquid Glass uses nano-technology to create an invisible 9H hardness shield on any device. No bubbles. No edges. Just pure protection.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Link to="/products" className="gradient-bg text-primary-foreground px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#video" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground hover:bg-secondary transition-colors font-medium">
                  <Play className="w-4 h-4" /> Watch Demo
                </a>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="flex gap-8 pt-4">
                {[{ n: "500+", l: "Retailers" }, { n: "50K+", l: "Devices Protected" }, { n: "4.9★", l: "Rating" }].map((s) => (
                  <div key={s.l}><div className="text-2xl font-heading font-bold text-foreground">{s.n}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:flex justify-center">
              <img src={productHero} alt="Microshield Product" className="w-80 animate-float drop-shadow-2xl" width={800} height={800} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">See It In Action</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Watch how Microshield Liquid Glass transforms screen protection forever.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/3grt8GG04o0"
                title="Microshield Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Why Choose Microshield?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Advanced nano-technology delivers unmatched screen protection.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-6 hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground mb-4">
                  {iconMap[f.icon]}
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Clean", desc: "Clean your device screen with the included wipe" },
              { step: "02", title: "Apply", desc: "Apply Microshield liquid evenly across the screen" },
              { step: "03", title: "Protect", desc: "Let it dry for 10 minutes. You're done!" },
            ].map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="text-5xl font-heading font-bold gradient-text mb-4">{s.step}</div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Our Partners Say</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-lg mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
              <p className="font-heading font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setCurrentTestimonial((p) => (p === 0 ? testimonials.length - 1 : p - 1))} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button onClick={() => setCurrentTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1))} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-bg rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">Ready to Protect Your Business?</h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">Join 500+ retailers across India who trust Microshield. Become a distributor today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/917289999300" target="_blank" rel="noopener noreferrer" className="bg-background text-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                WhatsApp Us Now
              </a>
              <Link to="/contact" className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary-foreground/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
