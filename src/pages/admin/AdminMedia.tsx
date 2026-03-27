import { Upload, Trash2, ImageIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminMedia() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["media-files"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from("product-images").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
      if (error) throw error;
      return data.filter((f) => f.name !== ".emptyFolderPlaceholder");
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    setUploading(false);
    if (error) { toast.error("Upload failed"); return; }
    queryClient.invalidateQueries({ queryKey: ["media-files"] });
    toast.success("Uploaded!");
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Delete this image?")) return;
    const { error } = await supabase.storage.from("product-images").remove([name]);
    if (error) { toast.error("Delete failed"); return; }
    queryClient.invalidateQueries({ queryKey: ["media-files"] });
    toast.success("Deleted!");
  };

  const getUrl = (name: string) => supabase.storage.from("product-images").getPublicUrl(name).data.publicUrl;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Media Library</h1>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-center p-8">Loading...</p>
      ) : files.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No media yet</h3>
          <p className="text-sm text-muted-foreground">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.name} className="glass-card overflow-hidden group relative">
              <img src={getUrl(file.name)} alt={file.name} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button onClick={() => handleDelete(file.name)} className="p-2 rounded-full bg-destructive text-destructive-foreground"><Trash2 className="w-4 h-4" /></button>
              </div>
              <p className="p-2 text-xs text-muted-foreground truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
