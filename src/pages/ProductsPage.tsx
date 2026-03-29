import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function ProductsPage() {
  const { data: categories = [] } = useQuery({
    queryKey: ["public-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*, categories(name)").eq("status", "active").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Complete range of Microshield products and accessories for every business need.</p>
        </motion.div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any, i: number) => (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="glass-card overflow-hidden hover:scale-[1.03] transition-transform group cursor-pointer">
                  {product.image_url ? (
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                    </div>
                  ) : (
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <span className="text-4xl text-muted-foreground">📦</span>
                    </div>
                  )}
                  <div className="p-4">
                    {product.categories?.name && (
                      <span className="text-xs font-medium text-primary mb-1 block">{product.categories.name}</span>
                    )}
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    {product.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>}
                    {product.price && <p className="text-lg font-bold gradient-text">₹{product.price}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Fallback to categories if no products yet */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat: any, i: number) => (
              <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="glass-card p-6 hover:scale-[1.03] transition-transform group cursor-pointer">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
