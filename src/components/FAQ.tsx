import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

type Lang = "en" | "hi";

interface FaqRow {
  id: string;
  question_en: string;
  answer_en: string;
  question_hi: string;
  answer_hi: string;
  sort_order: number;
  is_active: boolean;
}

const fallbackFaqs: FaqRow[] = [
  { id: "1", question_en: "What is 9H hardness?", answer_en: "9H hardness refers to high scratch resistance level, making the screen more durable.", question_hi: "9H हार्डनेस क्या होता है?", answer_hi: "9H हार्डनेस उच्च स्क्रैच रेजिस्टेंस को दर्शाता है, जिससे स्क्रीन अधिक सुरक्षित रहती है।", sort_order: 1, is_active: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FAQ() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("faq-lang");
    return saved === "hi" ? "hi" : "en";
  });

  useEffect(() => {
    localStorage.setItem("faq-lang", lang);
  }, [lang]);

  const { data: faqs = fallbackFaqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return (data as FaqRow[]).length > 0 ? (data as FaqRow[]) : fallbackFaqs;
    },
  });

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" /> FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            {lang === "en" ? "Everything you need to know about MicroShield Liquid Glass." : "MicroShield लिक्विड ग्लास के बारे में सब कुछ जानें।"}
          </p>
          <div className="inline-flex rounded-xl border border-border bg-background p-1 gap-1">
            <button onClick={() => setLang("en")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${lang === "en" ? "gradient-bg text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              English
            </button>
            <button onClick={() => setLang("hi")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${lang === "hi" ? "gradient-bg text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              हिंदी
            </button>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.id} value={faq.id} className="glass-card border border-border rounded-xl px-6 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">{i + 1}</span>
                    {lang === "en" ? faq.question_en : (faq.question_hi || faq.question_en)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-11">
                  {lang === "en" ? faq.answer_en : (faq.answer_hi || faq.answer_en)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
