import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

type Lang = "en" | "hi";

const faqs: Record<Lang, { q: string; a: string }[]> = {
  en: [
    { q: "What is 9H hardness?", a: "9H hardness refers to high scratch resistance level, making the screen more durable." },
    { q: "Which devices is this liquid suitable for?", a: "It can be used on smartphones, smartwatches, tablets, cameras, and laptops." },
    { q: "Can the liquid glass be removed?", a: "It bonds with the screen. Removal requires a chemical process and is not recommended." },
    { q: "Does the product come with warranty?", a: "No, this product does not come with any warranty or guarantee." },
    { q: "Does it affect touch sensitivity?", a: "No, it maintains original touch sensitivity." },
  ],
  hi: [
    { q: "9H हार्डनेस क्या होता है?", a: "9H हार्डनेस उच्च स्क्रैच रेजिस्टेंस को दर्शाता है, जिससे स्क्रीन अधिक सुरक्षित रहती है।" },
    { q: "यह लिक्विड किन डिवाइस पर इस्तेमाल कर सकते हैं?", a: "इसे मोबाइल, स्मार्ट वॉच, टैबलेट, कैमरा और लैपटॉप पर इस्तेमाल किया जा सकता है।" },
    { q: "क्या इसे हटाया जा सकता है?", a: "यह स्क्रीन से जुड़ जाता है, इसे हटाने के लिए केमिकल प्रोसेस की आवश्यकता होती है।" },
    { q: "क्या इस प्रोडक्ट की वारंटी है?", a: "नहीं, इस प्रोडक्ट पर कोई वारंटी नहीं दी जाती है।" },
    { q: "क्या इससे टच पर असर पड़ता है?", a: "नहीं, यह टच सेंसिटिविटी को प्रभावित नहीं करता।" },
  ],
};

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

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" /> FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            {lang === "en" ? "Everything you need to know about MicroShield Liquid Glass." : "MicroShield लिक्विड ग्लास के बारे में सब कुछ जानें।"}
          </p>

          {/* Language Toggle */}
          <div className="inline-flex rounded-xl border border-border bg-background p-1 gap-1">
            <button
              onClick={() => setLang("en")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                lang === "en"
                  ? "gradient-bg text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                lang === "hi"
                  ? "gradient-bg text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              हिंदी
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs[lang].map((faq, i) => (
              <AccordionItem
                key={`${lang}-${i}`}
                value={`item-${i}`}
                className="glass-card border border-border rounded-xl px-6 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-11">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
