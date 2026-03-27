import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Save, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", category_id: "", status: "active", image_url: "" });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*, categories(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) { toast.error("Upload failed: " + error.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    setForm({ ...form, image_url: urlData.publicUrl });
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const saveMutation = useMutation({
    mutationFn: async (product: any) => {
      const payload = { name: product.name, description: product.description, price: product.price ? parseFloat(product.price) : null, category_id: product.category_id || null, status: product.status, image_url: product.image_url || null };
      if (product.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-products"] }); toast.success("Product saved!"); setShowForm(false); setEditing(null); resetForm(); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("products").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-products"] }); toast.success("Product deleted"); },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => setForm({ name: "", description: "", price: "", category_id: "", status: "active", image_url: "" });

  const startEdit = (p: any) => {
    setForm({ name: p.name, description: p.description || "", price: p.price?.toString() || "", category_id: p.category_id || "", status: p.status || "active", image_url: p.image_url || "" });
    setEditing(p);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Products</h1>
        <button onClick={() => { resetForm(); setEditing(null); setShowForm(true); }} className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between"><h2 className="font-heading font-semibold text-foreground">{editing ? "Edit" : "Add"} Product</h2><button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-muted-foreground" /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Price (₹)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Category</label>
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select category</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="active">Active</option><option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Product Image</label>
            <div className="flex items-start gap-4">
              {form.image_url ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <img src={form.image_url} alt="Product" className="w-full h-full object-cover" />
                  <button onClick={() => setForm({ ...form, image_url: "" })} className="absolute top-1 right-1 p-0.5 rounded-full bg-destructive text-destructive-foreground"><X className="w-3 h-3" /></button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-colors disabled:opacity-50">
                  <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Image"}
                </button>
                <p className="text-xs text-muted-foreground mt-1">Max 5MB. JPG, PNG, WebP.</p>
              </div>
            </div>
          </div>

          <button onClick={() => saveMutation.mutate(editing ? { ...form, id: editing.id } : form)} disabled={saveMutation.isPending || !form.name.trim()} className="gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            <Save className="w-4 h-4" /> {saveMutation.isPending ? "Saving..." : "Save Product"}
          </button>
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Image</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No products yet. Add your first product!</td></tr>
              ) : products.map((p: any) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><ImageIcon className="w-4 h-4 text-muted-foreground" /></div>
                    )}
                  </td>
                  <td className="p-4 text-sm font-medium text-foreground">{p.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{p.categories?.name || "—"}</td>
                  <td className="p-4 text-sm text-foreground">{p.price ? `₹${p.price}` : "—"}</td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>{p.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => { if (confirm("Delete this product?")) deleteMutation.mutate(p.id); }} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
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
