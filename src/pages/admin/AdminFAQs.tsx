import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface FaqRow {
  id: string;
  question_en: string;
  answer_en: string;
  question_hi: string;
  answer_hi: string;
  sort_order: number;
  is_active: boolean;
}

const emptyFaq: Omit<FaqRow, "id"> = {
  question_en: "", answer_en: "", question_hi: "", answer_hi: "", sort_order: 0, is_active: true,
};

export default function AdminFAQs() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [form, setForm] = useState(emptyFaq);
  const [showForm, setShowForm] = useState(false);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
      if (error) throw error;
      return data as FaqRow[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!form.question_en.trim() || !form.answer_en.trim()) throw new Error("English Q&A required");
      if (editing) {
        const { error } = await supabase.from("faqs").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("faqs").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "FAQ updated" : "FAQ added");
      qc.invalidateQueries({ queryKey: ["admin-faqs"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("FAQ deleted");
      qc.invalidateQueries({ queryKey: ["admin-faqs"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyFaq);
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (faq: FaqRow) => {
    setEditing(faq);
    setForm({ question_en: faq.question_en, answer_en: faq.answer_en, question_hi: faq.question_hi, answer_hi: faq.answer_hi, sort_order: faq.sort_order, is_active: faq.is_active });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">FAQs</h1>
          <p className="text-sm text-muted-foreground">Manage frequently asked questions (English & Hindi)</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground">{editing ? "Edit FAQ" : "New FAQ"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary">English</h3>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Question</label>
                <input value={form.question_en} onChange={(e) => setForm({ ...form, question_en: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" placeholder="Question in English" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Answer</label>
                <textarea value={form.answer_en} onChange={(e) => setForm({ ...form, answer_en: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none" placeholder="Answer in English" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-accent">हिंदी</h3>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">सवाल</label>
                <input value={form.question_hi} onChange={(e) => setForm({ ...form, question_hi: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" placeholder="Question in Hindi" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">जवाब</label>
                <textarea value={form.answer_hi} onChange={(e) => setForm({ ...form, answer_hi: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none" placeholder="Answer in Hindi" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-24 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
              <span className="text-sm text-foreground">Active</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : editing ? "Update" : "Add"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 rounded-lg text-sm border border-border text-foreground hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No FAQs yet. Add your first one!</div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className={`bg-card border border-border rounded-xl p-4 flex items-start gap-4 ${!faq.is_active ? "opacity-50" : ""}`}>
              <GripVertical className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{faq.question_en}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{faq.answer_en}</p>
                    {faq.question_hi && (
                      <p className="text-xs text-accent mt-1">हिंदी: {faq.question_hi}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs text-muted-foreground mr-2">#{faq.sort_order}</span>
                    <button onClick={() => startEdit(faq)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <button onClick={() => { if (confirm("Delete this FAQ?")) deleteMutation.mutate(faq.id); }} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
