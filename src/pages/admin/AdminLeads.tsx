import { Check, Trash2 } from "lucide-react";

const leads = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", message: "Interested in becoming a distributor in Pune", date: "2026-03-25", status: "new" },
  { id: 2, name: "Meena Kumari", phone: "9123456789", message: "Bulk order inquiry for 500 units", date: "2026-03-24", status: "new" },
  { id: 3, name: "Vikram Patel", phone: "9988776655", message: "Need pricing for machine kits", date: "2026-03-23", status: "completed" },
];

export default function AdminLeads() {
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
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-border/50">
                  <td className="p-4 text-sm font-medium text-foreground">{l.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{l.phone}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{l.message}</td>
                  <td className="p-4 text-sm text-muted-foreground">{l.date}</td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${l.status === "new" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{l.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors"><Check className="w-4 h-4 text-accent" /></button>
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
