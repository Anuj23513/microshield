export default function AdminContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Content Management</h1>
      <div className="grid gap-4">
        {[
          { title: "Homepage Hero", desc: "Edit hero banner title, subtitle, and CTA" },
          { title: "Features Section", desc: "Update product features and descriptions" },
          { title: "About Us Page", desc: "Edit company story and team information" },
          { title: "Contact Information", desc: "Update address, phone, and email" },
          { title: "Testimonials", desc: "Manage customer reviews and ratings" },
        ].map((item) => (
          <div key={item.title} className="glass-card p-5 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Edit</button>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground italic">💡 Enable Lovable Cloud to make content editable and persistent via database.</p>
    </div>
  );
}
