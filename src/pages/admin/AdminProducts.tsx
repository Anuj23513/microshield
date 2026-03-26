import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { categories } from "@/lib/data";

export default function AdminProducts() {
  const [products] = useState([
    { id: 1, name: "Microshield Liquid 10ml", category: "Liquid", price: "₹199", status: "Active" },
    { id: 2, name: "Microshield Liquid 25ml", category: "Liquid", price: "₹399", status: "Active" },
    { id: 3, name: "Application Machine Pro", category: "Machine", price: "₹4,999", status: "Active" },
    { id: 4, name: "Cleaning Wipes (50 pack)", category: "Wipes", price: "₹149", status: "Active" },
    { id: 5, name: "Single Machine Kit", category: "Single Machine Kit", price: "₹6,999", status: "Active" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Products</h1>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-foreground">{p.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{p.category}</td>
                  <td className="p-4 text-sm text-foreground">{p.price}</td>
                  <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">{p.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
