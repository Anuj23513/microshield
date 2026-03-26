import { Upload, Image, Trash2 } from "lucide-react";

export default function AdminMedia() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Media Library</h1>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>
      <div className="glass-card p-8 text-center">
        <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">Media Management</h3>
        <p className="text-sm text-muted-foreground mb-4">Enable Lovable Cloud to upload and manage images and videos.</p>
      </div>
    </div>
  );
}
