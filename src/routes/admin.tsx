import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  deleteMenuItem, listMenu, listOrders, saveMenuItem, updateOrderStatus,
  listUsers, deleteUser, setUserRole, confirmDeliveryWithOtp,
  type MealType, type MenuItem, type Order, type OrderStatus, type User,
} from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2, Plus, IndianRupee, ShoppingBag, Users as UsersIcon, UtensilsCrossed, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — DabbaDaily" }] }),
  component: AdminPage,
});

const empty: MenuItem = { id: "", name: "", description: "", mealType: "lunch", veg: true, price: 0, available: true, image: "" };
const STATUSES: OrderStatus[] = ["placed", "preparing", "out_for_delivery", "delivered", "cancelled"];
type Period = "today" | "weekly" | "monthly" | "yearly" | "all" | "day" | "month" | "year";

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [draft, setDraft] = useState<MenuItem>(empty);
  const [period, setPeriod] = useState<Period>("today");
  const [pickedDate, setPickedDate] = useState<Date | undefined>(new Date());
  const [orderPeriod, setOrderPeriod] = useState<Period>("all");
  const [orderPickedDate, setOrderPickedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!user) { navigate({ to: "/login" }); return; }
    if (user.role !== "admin") { navigate({ to: "/" }); return; }
    setMenu(listMenu());
    setOrders(listOrders());
    setUsers(listUsers());
  }, [user, navigate, tick]);

  const periodOrders = useMemo(() => {
    if (period === "all") return orders;
    if (period === "day" || period === "month" || period === "year") {
      const d = pickedDate ?? new Date();
      return orders.filter(o => {
        const od = new Date(o.placedAt);
        if (period === "day") return od.toDateString() === d.toDateString();
        if (period === "month") return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth();
        return od.getFullYear() === d.getFullYear();
      });
    }
    const now = new Date();
    const start = new Date(now);
    if (period === "today") start.setHours(0, 0, 0, 0);
    else if (period === "weekly") { start.setDate(now.getDate() - 7); }
    else if (period === "monthly") { start.setMonth(now.getMonth() - 1); }
    else if (period === "yearly") { start.setFullYear(now.getFullYear() - 1); }
    return orders.filter(o => new Date(o.placedAt) >= start);
  }, [orders, period, pickedDate]);

  const todayOrders = useMemo(() => {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return orders.filter(o => new Date(o.placedAt) >= start);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (orderPeriod === "all") return orders;
    if (orderPeriod === "day" || orderPeriod === "month" || orderPeriod === "year") {
      const d = orderPickedDate ?? new Date();
      return orders.filter(o => {
        const od = new Date(o.placedAt);
        if (orderPeriod === "day") return od.toDateString() === d.toDateString();
        if (orderPeriod === "month") return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth();
        return od.getFullYear() === d.getFullYear();
      });
    }
    const now = new Date();
    const start = new Date(now);
    if (orderPeriod === "today") start.setHours(0, 0, 0, 0);
    else if (orderPeriod === "weekly") { start.setDate(now.getDate() - 7); }
    else if (orderPeriod === "monthly") { start.setMonth(now.getMonth() - 1); }
    else if (orderPeriod === "yearly") { start.setFullYear(now.getFullYear() - 1); }
    return orders.filter(o => new Date(o.placedAt) >= start);
  }, [orders, orderPeriod, orderPickedDate]);

  const stats = useMemo(() => {
    const revenue = periodOrders.filter(o => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0);
    const active = orders.filter(o => !["delivered", "cancelled"].includes(o.status)).length;
    return {
      revenue,
      orders: periodOrders.length,
      active,
      menu: menu.length,
      customers: users.filter(u => u.role === "customer").length,
    };
  }, [orders, periodOrders, menu, users]);

  if (!user || user.role !== "admin") return null;

  const refresh = () => setTick(t => t + 1);

  const add = () => {
    if (!draft.name || draft.price <= 0) return toast.error("Name and price required");
    saveMenuItem(draft);
    toast.success("Dish added");
    setDraft(empty);
    refresh();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Admin panel</h1>
      <p className="mt-1 text-muted-foreground">Dashboard, menu, orders and users.</p>

      <Tabs defaultValue="dashboard" className="mt-8">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="menu">Manage Menu</TabsTrigger>
          <TabsTrigger value="orders">Manage Orders</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Revenue calculator:</span>
            {(["today", "weekly", "monthly", "yearly", "all", "day", "month", "year"] as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${period === p ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-muted"}`}
              >
                {p === "day" ? "Pick day" : p === "month" ? "Pick month" : p === "year" ? "Pick year" : p}
              </button>
            ))}
            {(period === "day" || period === "month" || period === "year") && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className={cn("h-7 gap-2", !pickedDate && "text-muted-foreground")}>
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {pickedDate
                      ? period === "day"
                        ? format(pickedDate, "PPP")
                        : period === "month"
                          ? format(pickedDate, "MMM yyyy")
                          : format(pickedDate, "yyyy")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickedDate}
                    onSelect={setPickedDate}
                    captionLayout="dropdown"
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<IndianRupee className="h-5 w-5" />} label={`Revenue (${period})`} value={`₹${stats.revenue}`} sub={`${stats.orders} orders`} />
            <StatCard icon={<ShoppingBag className="h-5 w-5" />} label="Today's orders" value={todayOrders.length} sub={`₹${todayOrders.filter(o => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0)} earned`} />
            <StatCard icon={<UtensilsCrossed className="h-5 w-5" />} label="Menu items" value={stats.menu} sub={`${stats.active} active orders`} />
            <StatCard icon={<UsersIcon className="h-5 w-5" />} label="Customers" value={stats.customers} />
          </div>

          <section className="mt-6 rounded-2xl border bg-card p-6">
            <h2 className="font-semibold">Today's orders ({todayOrders.length})</h2>
            <div className="mt-4 space-y-2">
              {todayOrders.slice(0, 8).map(o => (
                <div key={o.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div>
                    <div className="font-medium">#{o.id.slice(0, 6).toUpperCase()} · ₹{o.total}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.placedAt).toLocaleString()} · {o.paymentMethod.toUpperCase()}</div>
                  </div>
                  <Badge variant="outline" className="capitalize">{o.status.replace(/_/g, " ")}</Badge>
                </div>
              ))}
              {todayOrders.length === 0 && <p className="text-sm text-muted-foreground">No orders today yet.</p>}
            </div>
          </section>
        </TabsContent>

        {/* Menu */}
        <TabsContent value="menu" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border bg-card p-6 lg:col-span-1">
              <h2 className="font-semibold">Add menu item</h2>
              <div className="mt-4 space-y-3">
                <div className="space-y-1"><Label>Name</Label><Input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></div>
                <div className="space-y-1"><Label>Description</Label><Input value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1"><Label>Price (₹)</Label><Input type="number" value={draft.price || ""} onChange={e => setDraft({ ...draft, price: Number(e.target.value) })} /></div>
                  <div className="space-y-1">
                    <Label>Meal</Label>
                    <select className="h-9 w-full rounded-md border bg-background px-3 text-sm" value={draft.mealType} onChange={e => setDraft({ ...draft, mealType: e.target.value as MealType })}>
                      <option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.veg} onChange={e => setDraft({ ...draft, veg: e.target.checked })} /> Vegetarian</label>
                <div className="space-y-1">
                  <Label>Image URL</Label>
                  <Input placeholder="https://… or upload below" value={draft.image || ""} onChange={e => setDraft({ ...draft, image: e.target.value })} />
                  <Input type="file" accept="image/*" onChange={e => {
                    const f = e.target.files?.[0]; if (!f) return;
                    if (f.size > 1_500_000) { toast.error("Image too large (max ~1.5MB)"); return; }
                    const r = new FileReader();
                    r.onload = () => setDraft(d => ({ ...d, image: r.result as string }));
                    r.readAsDataURL(f);
                  }} />
                  {draft.image && <img src={draft.image} alt="preview" className="mt-2 h-24 w-full rounded-md object-cover" />}
                </div>
                <Button className="w-full" onClick={add}><Plus className="mr-1 h-4 w-4" />Add dish</Button>
              </div>
            </section>

            <section className="rounded-2xl border bg-card p-6 lg:col-span-2">
              <h2 className="font-semibold">Menu ({menu.length})</h2>
              <div className="mt-4 max-h-[500px] space-y-2 overflow-auto">
                {menu.map(m => (
                  <div key={m.id} className="flex items-center gap-3 rounded-lg border p-3">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="h-12 w-12 rounded-md object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xl">
                        {m.mealType === "breakfast" ? "🍳" : m.mealType === "lunch" ? "🍛" : "🍲"}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{m.mealType} · {m.veg ? "Veg" : "Non-veg"} · ₹{m.price}</div>
                    </div>
                    <label className="flex items-center gap-1 text-xs">
                      <input type="checkbox" checked={m.available} onChange={e => { saveMenuItem({ ...m, available: e.target.checked }); refresh(); }} />
                      Available
                    </label>
                    <Button size="icon" variant="ghost" onClick={() => { deleteMenuItem(m.id); refresh(); }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="mt-6">
          <section className="rounded-2xl border bg-card p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold">Orders ({filteredOrders.length})</h2>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Filter:</span>
                {(["today", "weekly", "monthly", "yearly", "all", "day", "month", "year"] as Period[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setOrderPeriod(p)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${orderPeriod === p ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-muted"}`}
                  >
                    {p === "day" ? "Pick day" : p === "month" ? "Pick month" : p === "year" ? "Pick year" : p}
                  </button>
                ))}
                {(orderPeriod === "day" || orderPeriod === "month" || orderPeriod === "year") && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className={cn("h-7 gap-2", !orderPickedDate && "text-muted-foreground")}>
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {orderPickedDate
                          ? orderPeriod === "day"
                            ? format(orderPickedDate, "PPP")
                            : orderPeriod === "month"
                              ? format(orderPickedDate, "MMM yyyy")
                              : format(orderPickedDate, "yyyy")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={orderPickedDate}
                        onSelect={setOrderPickedDate}
                        captionLayout="dropdown"
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              For "Out for delivery" orders, enter the customer's 4-digit OTP to mark delivered. COD payment is auto-collected on successful OTP.
            </p>
            <div className="mt-4 space-y-3">
              {filteredOrders.length === 0 && <p className="text-sm text-muted-foreground">No orders found for selected filter.</p>}
              {filteredOrders.map(o => (
                <div key={o.id} className="space-y-2 rounded-lg border p-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium">#{o.id.slice(0, 6).toUpperCase()} · ₹{o.total}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.placedAt).toLocaleString()} · {o.items.map(i => `${i.qty}× ${i.name}`).join(", ")}</div>
                    </div>
                    <Badge variant="outline" className="uppercase">{o.paymentMethod}</Badge>
                    <Badge variant="outline">{o.paymentStatus}</Badge>
                    <select value={o.status} onChange={e => { updateOrderStatus(o.id, e.target.value as OrderStatus); refresh(); }}
                      className="h-9 rounded-md border bg-background px-2 text-sm">
                      {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                    </select>
                  </div>
                  {o.status === "out_for_delivery" && (
                    <OtpConfirm orderId={o.id} onDone={refresh} />
                  )}
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="mt-6">
          <section className="rounded-2xl border bg-card p-6">
            <h2 className="font-semibold">Users ({users.length})</h2>
            <div className="mt-4 space-y-2">
              {users.map(u => (
                <div key={u.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                  <div className="flex-1">
                    <div className="font-medium">{u.name} <span className="text-xs text-muted-foreground">· {u.email}</span></div>
                    <div className="text-xs text-muted-foreground">
                      {u.phone || "no phone"} · {u.address || "no address"} · sub: {u.subscription || "none"}
                    </div>
                  </div>
                  <select
                    value={u.role}
                    onChange={e => { setUserRole(u.id, e.target.value as User["role"]); refresh(); }}
                    className="h-9 rounded-md border bg-background px-2 text-sm"
                  >
                    <option value="customer">customer</option>
                    <option value="admin">admin</option>
                  </select>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={u.id === user.id}
                    onClick={() => {
                      if (!confirm(`Delete user ${u.email}?`)) return;
                      deleteUser(u.id);
                      toast.success("User deleted");
                      refresh();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {users.length === 0 && <p className="text-sm text-muted-foreground">No users yet.</p>}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-sm">{label}</span></div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function OtpConfirm({ orderId, onDone }: { orderId: string; onDone: () => void }) {
  const [otp, setOtp] = useState("");
  const submit = () => {
    if (otp.length !== 4) return toast.error("Enter 4-digit OTP");
    const r = confirmDeliveryWithOtp(orderId, otp);
    if (r.ok) { toast.success("Delivered & payment collected"); setOtp(""); onDone(); }
    else toast.error(r.message);
  };
  return (
    <div className="flex items-center gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 p-2">
      <span className="text-xs font-medium text-primary">Enter customer OTP:</span>
      <Input
        value={otp}
        onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
        placeholder="0000"
        className="h-8 w-24 font-mono tracking-widest"
      />
      <Button size="sm" onClick={submit}>Confirm delivery</Button>
    </div>
  );
}
