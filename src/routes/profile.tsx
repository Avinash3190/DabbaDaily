import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { updateProfile } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — DabbaDaily" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "", subscription: "none" as "none" | "weekly" | "monthly" });

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else setForm({ name: user.name, phone: user.phone ?? "", address: user.address ?? "", city: user.city ?? "", pincode: user.pincode ?? "", subscription: user.subscription ?? "none" });
  }, [user, navigate]);

  if (!user) return null;

  const save = () => {
    updateProfile(user.id, form);
    refresh();
    toast.success("Profile updated");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <p className="mt-1 text-muted-foreground">Manage your details, address and subscription.</p>

      <section className="mt-8 rounded-2xl border bg-card p-6">
        <h2 className="font-semibold">Personal details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={user.email} disabled /></div>
          <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-card p-6">
        <h2 className="font-semibold">Delivery address</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="Flat, street, area" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Pincode</Label>
              <Input placeholder="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-card p-6">
        <h2 className="font-semibold">Subscription</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(["none", "weekly", "monthly"] as const).map(s => (
            <button key={s} onClick={() => setForm({ ...form, subscription: s })}
              className={`rounded-xl border p-4 text-left transition ${form.subscription === s ? "border-primary bg-primary/5" : "hover:bg-muted"}`}>
              <div className="font-medium capitalize">{s === "none" ? "Pay per order" : `${s} plan`}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s === "none" ? "No commitment" : s === "weekly" ? "7 days · save 10%" : "30 days · save 20%"}
              </div>
            </button>
          ))}
        </div>
      </section>

      <Button className="mt-6" onClick={save}>Save changes</Button>
    </main>
  );
}
