import { Plus, Pencil, Trash2 } from "lucide-react";
import { categories } from "@/lib/data";

export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Categories</h1>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{cat.icon}</span>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
              </div>
            </div>
            <h3 className="font-heading font-semibold text-foreground">{cat.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
