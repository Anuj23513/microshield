import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setSending(true);
    // Save to database
    const { error } = await supabase.from("leads").insert({ name: form.name.trim(), phone: form.phone.trim(), message: form.message.trim() });
    setSending(false);
    if (error) {
      toast.error("Failed to send. Please try WhatsApp directly.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    // Also open WhatsApp
    const msg = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${msg}`, "_blank");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Get in touch for bulk orders, dealership inquiries, or support.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-heading font-semibold text-foreground text-xl">Get In Touch</h2>
              <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" /><div><p className="font-medium text-foreground">Address</p><p className="text-sm text-muted-foreground">{contactInfo.address}</p></div></div>
              <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-primary shrink-0" /><div><p className="font-medium text-foreground">WhatsApp</p><p className="text-sm text-muted-foreground">{contactInfo.whatsapp}</p></div></div>
              <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-primary shrink-0" /><div><p className="font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">{contactInfo.email}</p></div></div>
            </div>
            <div className="glass-card overflow-hidden rounded-2xl h-64">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.8!2d77.302!3d28.512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1a3a3a3a3a3%3A0x0!2sBanke+Lal+Market%2C+Badarpur%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1" className="w-full h-full border-0" allowFullScreen loading="lazy" title="Location" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <h2 className="font-heading font-semibold text-foreground text-xl">Send a Message</h2>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" maxLength={100} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your phone number" maxLength={15} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Message</label><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Your message" maxLength={1000} /></div>
              <button type="submit" disabled={sending} className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
