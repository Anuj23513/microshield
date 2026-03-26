import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, FolderOpen, MessageSquare, Eye } from "lucide-react";

export default function AdminDashboard() {
  const { data: productCount = 0 } = useQuery({
    queryKey: ["count-products"],
    queryFn: async () => {
      const { count, error } = await supabase.from("products").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: categoryCount = 0 } = useQuery({
    queryKey: ["count-categories"],
    queryFn: async () => {
      const { count, error } = await supabase.from("categories").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: leadCount = 0 } = useQuery({
    queryKey: ["count-leads"],
    queryFn: async () => {
      const { count, error } = await supabase.from("leads").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: recentLeads = [] } = useQuery({
    queryKey: ["recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    { label: "Total Products", value: productCount.toString(), icon: Package, color: "bg-primary/10 text-primary" },
    { label: "Categories", value: categoryCount.toString(), icon: FolderOpen, color: "bg-accent/10 text-accent" },
    { label: "Inquiries", value: leadCount.toString(), icon: MessageSquare, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          {recentLeads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No inquiries yet.</p>
          ) : recentLeads.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-foreground text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.message}</p>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
