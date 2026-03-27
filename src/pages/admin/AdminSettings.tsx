import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminSettings() {
  const queryClient = useQueryClient();

  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data.forEach((s: any) => { map[s.key] = s.value || ""; });
      return map;
    },
  });

  const [form, setForm] = useState({ site_name: "", whatsapp: "", meta_title: "", meta_description: "" });

  useEffect(() => {
    setForm({
      site_name: settings.site_name || "Microshield",
      whatsapp: settings.whatsapp || "7289999300",
      meta_title: settings.meta_title || "Microshield Liquid Glass Screen Protector",
      meta_description: settings.meta_description || "India's #1 liquid glass screen protector. 9H hardness, antimicrobial coating.",
    });
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const entries = Object.entries(form);
      for (const [key, value] of entries) {
        const { data: existing } = await supabase.from("site_settings").select("id").eq("key", key).maybeSingle();
        if (existing) {
          await supabase.from("site_settings").update({ value }).eq("key", key);
        } else {
          await supabase.from("site_settings").insert({ key, value });
        }
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["site-settings"] }); toast.success("Settings saved!"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">General</h2>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Website Name</label><input value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">WhatsApp Number</label><input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">SEO</h2>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Meta Title</label><input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Meta Description</label><textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
        </div>
        <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
          <Save className="w-4 h-4" /> {saveMutation.isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
