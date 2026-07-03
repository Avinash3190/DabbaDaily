import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { listNotifications, markAllRead, type Notification } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Truck } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — DabbaDaily" }] }),
  component: NotificationsPage,
});

const icon = { email: Mail, sms: MessageSquare, delivery: Truck };

function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else setItems(listNotifications(user.id));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <Button variant="outline" size="sm" onClick={() => { markAllRead(user.id); setItems(listNotifications(user.id)); }}>Mark all read</Button>
      </div>
      <div className="mt-6 space-y-3">
        {items.length === 0 && <p className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">You're all caught up.</p>}
        {items.map(n => {
          const I = icon[n.type];
          return (
            <div key={n.id} className={`flex gap-4 rounded-xl border bg-card p-4 ${!n.read ? "border-primary/40" : ""}`}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><I className="h-5 w-5" /></div>
              <div className="flex-1">
                <p className="text-sm">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()} · {n.type.toUpperCase()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
