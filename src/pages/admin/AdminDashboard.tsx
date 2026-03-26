import { Package, FolderOpen, MessageSquare, Eye } from "lucide-react";

const stats = [
  { label: "Total Products", value: "24", icon: Package, color: "bg-primary/10 text-primary" },
  { label: "Categories", value: "12", icon: FolderOpen, color: "bg-accent/10 text-accent" },
  { label: "Inquiries", value: "156", icon: MessageSquare, color: "bg-destructive/10 text-destructive" },
  { label: "Visitors (30d)", value: "3.2K", icon: Eye, color: "bg-muted-foreground/10 text-muted-foreground" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.color}`}><s.icon className="w-4 h-4" /></div>
            </div>
            <div className="text-3xl font-heading font-bold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h2 className="font-heading font-semibold text-foreground mb-4">Recent Inquiries</h2>
        <div className="space-y-3">
          {[
            { name: "Rahul S.", phone: "98765xxxxx", msg: "Interested in dealership", time: "2 hours ago" },
            { name: "Meena K.", phone: "91234xxxxx", msg: "Bulk order inquiry for 500 units", time: "5 hours ago" },
            { name: "Vikram P.", phone: "99887xxxxx", msg: "Need pricing for machine kits", time: "1 day ago" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-foreground text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.msg}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
