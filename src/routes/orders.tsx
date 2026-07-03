import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { cancelOrder, listOrders, processPayment, type Order, type OrderStatus } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Package, ChefHat, Bike, Home } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Your Orders — DabbaDaily" }] }),
  component: OrdersPage,
});

const statusColor: Record<OrderStatus, string> = {
  placed: "bg-warning text-warning-foreground",
  preparing: "bg-warning text-warning-foreground",
  out_for_delivery: "bg-primary text-primary-foreground",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const STEPS: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: "placed", label: "Placed", icon: <Package className="h-4 w-4" /> },
  { key: "preparing", label: "Preparing", icon: <ChefHat className="h-4 w-4" /> },
  { key: "out_for_delivery", label: "Out for delivery", icon: <Bike className="h-4 w-4" /> },
  { key: "delivered", label: "Delivered", icon: <Home className="h-4 w-4" /> },
];

function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else setOrders(listOrders(user.id));
  }, [user, navigate, tick]);

  // Live refresh every 5s so status updates from admin appear
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 5000);
    return () => clearInterval(t);
  }, []);

  if (!user) return null;

  const retry = (id: string) => {
    const r = processPayment(id);
    toast[r === "paid" ? "success" : "error"](`Payment ${r}`);
    setTick(t => t + 1);
  };
  const cancel = (id: string) => { cancelOrder(id); toast.success("Order cancelled"); setTick(t => t + 1); };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your orders</h1>
      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
          <Button asChild className="mt-4"><Link to="/menu">Order now</Link></Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map(o => {
            const stepIdx = STEPS.findIndex(s => s.key === o.status);
            const isCancelled = o.status === "cancelled";
            return (
              <article key={o.id} className="rounded-2xl border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">#{o.id.slice(0, 6).toUpperCase()} · {new Date(o.placedAt).toLocaleString()}</div>
                    <div className="mt-1 font-semibold">{o.items.length} item{o.items.length > 1 ? "s" : ""} · ₹{o.total}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[o.status]}>{o.status.replace(/_/g, " ")}</Badge>
                    <Badge variant="outline" className="capitalize">{o.paymentMethod === "cod" ? "COD" : o.paymentMethod}</Badge>
                    <Badge variant={o.paymentStatus === "paid" ? "default" : "outline"}>{o.paymentStatus}</Badge>
                  </div>
                </div>

                {/* Tracker */}
                {!isCancelled && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      {STEPS.map((s, i) => {
                        const done = i <= stepIdx;
                        const active = i === stepIdx && o.status !== "delivered";
                        return (
                          <div key={s.key} className="flex flex-1 flex-col items-center">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"} ${active ? "ring-4 ring-primary/20 animate-pulse" : ""}`}>
                              {i < stepIdx ? <Check className="h-4 w-4" /> : s.icon}
                            </div>
                            <span className={`mt-1 text-[11px] ${done ? "font-medium text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="relative -mt-7 mx-12 h-0.5 bg-border -z-10">
                      <div className="h-full bg-primary transition-all" style={{ width: `${(Math.max(0, stepIdx) / (STEPS.length - 1)) * 100}%` }} />
                    </div>
                  </div>
                )}

                {/* Delivery OTP */}
                {o.status !== "delivered" && o.status !== "cancelled" && (
                  <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-primary">Delivery OTP</div>
                      <div className="text-xs text-muted-foreground">
                        Share with rider on arrival{o.paymentMethod === "cod" ? " and pay cash" : ""}.
                      </div>
                    </div>
                    <div className="font-mono text-2xl font-bold tracking-[0.3em] text-primary">{o.deliveryOtp}</div>
                  </div>
                )}

                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {o.items.map(i => <li key={i.menuItemId}>{i.qty}× {i.name} <span className="text-foreground">₹{i.price * i.qty}</span></li>)}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">Deliver to: {o.address}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {o.paymentStatus === "failed" && <Button size="sm" onClick={() => retry(o.id)}>Retry payment</Button>}
                  {o.status !== "delivered" && o.status !== "cancelled" && (
                    <Button size="sm" variant="outline" onClick={() => cancel(o.id)}>Cancel</Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
