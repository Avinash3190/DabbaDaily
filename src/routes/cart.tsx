import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, Trash2, Smartphone, CreditCard, Banknote } from "lucide-react";
import { useState } from "react";
import { placeOrder, processPayment, type PaymentMethod } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — DabbaDaily" }] }),
  component: CartPage,
});

// Mock Razorpay-style checkout. Replace with real Razorpay SDK in production.
function razorpayCheckout(amount: number): Promise<"paid" | "failed"> {
  return new Promise(resolve => {
    const ok = window.confirm(`Razorpay (TEST)\n\nPay ₹${amount}?\n\nOK = Pay · Cancel = Fail`);
    setTimeout(() => resolve(ok ? "paid" : "failed"), 600);
  });
}

function CartPage() {
  const { lines, setQty, remove, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address ?? "");
  const [method, setMethod] = useState<PaymentMethod>("online");
  const [placing, setPlacing] = useState(false);

  const checkout = async () => {
    if (!user) { toast.error("Please sign in to checkout"); navigate({ to: "/login" }); return; }
    if (!address.trim()) return toast.error("Enter a delivery address");
    if (lines.length === 0) return;
    setPlacing(true);
    try {
      // For online/card, collect payment FIRST. For COD, place order and collect on delivery.
      if (method === "online" || method === "card") {
        const result = method === "online"
          ? await razorpayCheckout(total)
          : (Math.random() > 0.05 ? "paid" : "failed") as "paid" | "failed";
        if (result !== "paid") {
          toast.error("Payment failed. Please try again.");
          return;
        }
      }
      const order = placeOrder(
        user.id,
        lines.map(l => ({ menuItemId: l.item.id, name: l.item.name, qty: l.qty, price: l.item.price })),
        address,
        method,
      );
      if (method !== "cod") {
        // Mark order paid since we already charged above
        processPayment(order.id);
      }
      toast.success(
        method === "cod"
          ? `Order placed! Pay ₹${total} in cash on delivery. Share OTP ${order.deliveryOtp} with the rider.`
          : `Payment successful! Your delivery OTP is ${order.deliveryOtp}.`,
        { duration: 6000 }
      );
      clear();
      navigate({ to: "/orders" });
    } finally { setPlacing(false); }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4"><Link to="/menu">Browse menu</Link></Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {lines.map(l => (
              <div key={l.item.id} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-2xl">
                  {l.item.mealType === "breakfast" ? "🍳" : l.item.mealType === "lunch" ? "🍛" : "🍲"}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{l.item.name}</div>
                  <div className="text-sm text-muted-foreground">₹{l.item.price} each</div>
                </div>
                <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                  <button onClick={() => setQty(l.item.id, l.qty - 1)} className="rounded-full p-1 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                  <button onClick={() => setQty(l.item.id, l.qty + 1)} className="rounded-full p-1 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                </div>
                <div className="w-20 text-right font-semibold">₹{l.item.price * l.qty}</div>
                <Button size="icon" variant="ghost" onClick={() => remove(l.item.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
          <aside className="rounded-2xl border bg-card p-6">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-accent">Free</span></div>
              <div className="flex justify-between border-t pt-2 text-base font-bold"><span>Total</span><span>₹{total}</span></div>
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="addr">Delivery address</Label>
              <Input id="addr" placeholder="Flat, street, city" value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <div className="mt-5 space-y-2">
              <Label>Payment method</Label>
              <RadioGroup value={method} onValueChange={v => setMethod(v as PaymentMethod)} className="gap-2">
                <PayOption value="online" current={method} icon={<Smartphone className="h-4 w-4" />} title="Online (Razorpay)" sub="UPI, Netbanking, Wallets" />
                <PayOption value="card" current={method} icon={<CreditCard className="h-4 w-4" />} title="Credit / Debit Card" sub="Visa, Mastercard, RuPay" />
                <PayOption value="cod" current={method} icon={<Banknote className="h-4 w-4" />} title="Cash on Delivery" sub="Pay cash to the rider · OTP confirms delivery" />
              </RadioGroup>
            </div>

            <Button className="mt-5 w-full" onClick={checkout} disabled={placing}>
              {placing ? "Processing…" : method === "cod" ? "Place order (COD)" : `Pay ₹${total} & place order`}
            </Button>
            <p className="mt-2 text-[11px] text-muted-foreground">
              A 4-digit OTP will be shared with you. Give it to the delivery rider to confirm delivery.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function PayOption({ value, current, icon, title, sub }: { value: PaymentMethod; current: PaymentMethod; icon: React.ReactNode; title: string; sub: string }) {
  const selected = value === current;
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${selected ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
      <RadioGroupItem value={value} className="mt-0.5" />
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <span className="flex-1">
        <span className="block font-medium text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
    </label>
  );
}
