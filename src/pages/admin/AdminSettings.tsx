import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">General</h2>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Website Name</label><input defaultValue="Microshield" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">WhatsApp Number</label><input defaultValue="7289999300" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        </div>
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">SEO</h2>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Meta Title</label><input defaultValue="Microshield Liquid Glass Screen Protector" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Meta Description</label><textarea defaultValue="India's #1 liquid glass screen protector. 9H hardness, antimicrobial coating." rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
        </div>
        <button className="gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" /> Save Settings
        </button>
        <p className="text-sm text-muted-foreground italic">💡 Enable Lovable Cloud to persist settings to a database.</p>
      </div>
    </div>
  );
}
