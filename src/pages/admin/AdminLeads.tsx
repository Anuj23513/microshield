import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLeads() {
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").update({ status: "completed" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-leads"] }); toast.success("Marked as completed"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-leads"] }); toast.success("Lead deleted"); },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Leads & Inquiries</h1>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Message</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No inquiries yet.</td></tr>
              ) : leads.map((l: any) => (
                <tr key={l.id} className="border-b border-border/50">
                  <td className="p-4 text-sm font-medium text-foreground">{l.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{l.phone}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{l.message}</td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${l.status === "new" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{l.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {l.status === "new" && <button onClick={() => updateMutation.mutate(l.id)} className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors"><Check className="w-4 h-4 text-accent" /></button>}
                      <button onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(l.id); }} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
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
