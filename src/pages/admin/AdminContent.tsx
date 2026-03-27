import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Pencil, X, Save } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { key: "hero", title: "Homepage Hero", fields: [{ name: "title", label: "Title", type: "text" }, { name: "subtitle", label: "Subtitle", type: "textarea" }, { name: "cta_text", label: "CTA Button Text", type: "text" }] },
  { key: "about", title: "About Us", fields: [{ name: "heading", label: "Heading", type: "text" }, { name: "description", label: "Description", type: "textarea" }] },
  { key: "contact", title: "Contact Info", fields: [{ name: "address", label: "Address", type: "text" }, { name: "phone", label: "Phone", type: "text" }, { name: "email", label: "Email", type: "text" }] },
];

export default function AdminContent() {
  const queryClient = useQueryClient();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const { data: contentBlocks = [] } = useQuery({
    queryKey: ["content-blocks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content_blocks").select("*");
      if (error) throw error;
      return data;
    },
  });

  const getContent = (section: string) => {
    const block = contentBlocks.find((b: any) => b.section === section);
    return (block?.content as Record<string, string>) || {};
  };

  const startEdit = (sectionKey: string) => {
    setForm(getContent(sectionKey));
    setEditingSection(sectionKey);
  };

  const saveMutation = useMutation({
    mutationFn: async ({ section, content }: { section: string; content: Record<string, string> }) => {
      const existing = contentBlocks.find((b: any) => b.section === section);
      if (existing) {
        const { error } = await supabase.from("content_blocks").update({ content }).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("content_blocks").insert({ section, content });
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["content-blocks"] }); toast.success("Content saved!"); setEditingSection(null); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Content Management</h1>
      <div className="grid gap-4">
        {SECTIONS.map((section) => (
          <div key={section.key} className="glass-card p-5">
            {editingSection === section.key ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-foreground">{section.title}</h3>
                  <button onClick={() => setEditingSection(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="text-sm font-medium text-foreground mb-1 block">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                    ) : (
                      <input value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    )}
                  </div>
                ))}
                <button onClick={() => saveMutation.mutate({ section: section.key, content: form })} disabled={saveMutation.isPending} className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                  <Save className="w-4 h-4" /> {saveMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">Edit {section.title.toLowerCase()} content</p>
                </div>
                <button onClick={() => startEdit(section.key)} className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Pencil className="w-4 h-4" /> Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
