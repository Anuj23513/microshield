import { Save, KeyRound } from "lucide-react";
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

  const [form, setForm] = useState({ site_name: "", whatsapp: "", email: "", address: "", meta_title: "", meta_description: "" });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleChangeEmail = async () => {
    if (!newEmail) { toast.error("Enter a new email"); return; }
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) { toast.error(error.message); } else {
      toast.success("Confirmation sent to new email. Check your inbox.");
      setNewEmail("");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { toast.error(error.message); } else {
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
      <div className="max-w-2xl space-y-6">
        {/* Account Security */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><KeyRound className="w-4 h-4" /> Account Security</h2>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Change Email</label>
            <div className="flex gap-2">
              <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" placeholder="new-email@example.com" className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <button onClick={handleChangeEmail} className="gradient-bg text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Update</button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Confirm Password</label>
            <div className="flex gap-2">
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <button onClick={handleChangePassword} className="gradient-bg text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Update</button>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">General</h2>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Website Name</label><input value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">WhatsApp Number</label><input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Address</label><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
        </div>

        {/* SEO */}
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
