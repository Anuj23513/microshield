import { motion } from "framer-motion";
import { Shield, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Excellence Impex Trading Co. is India's trusted name in liquid glass screen protection technology.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a vision to revolutionize screen protection in India, Excellence Impex Trading Co. introduced Microshield Liquid Glass Screen Protector — a cutting-edge nano-technology solution that provides invisible, edge-to-edge protection for any device. We partner with retailers, distributors, and businesses across the country to deliver superior screen protection solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Our Mission", text: "To make advanced screen protection accessible to every Indian smartphone user through innovative nano-technology." },
              { icon: <Target className="w-6 h-6" />, title: "Our Vision", text: "To become India's largest liquid glass screen protector brand with presence in every state and major city." },
              { icon: <Users className="w-6 h-6" />, title: "Our Network", text: "500+ retail partners, 50+ distributors, and growing every day across India." },
              { icon: <Award className="w-6 h-6" />, title: "Quality Promise", text: "Every product is tested and certified for 9H hardness with antimicrobial properties." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
