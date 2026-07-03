import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { listMenu, type MealType } from "@/lib/store";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Leaf, Drumstick } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title: "Today's Menu — DabbaDaily" }, { name: "description", content: "Browse today's breakfast, lunch and dinner tiffins." }] }),
  component: MenuPage,
});

const TABS: { key: MealType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

function MenuPage() {
  const [tab, setTab] = useState<MealType | "all">("all");
  const [vegOnly, setVegOnly] = useState(false);
  const { add } = useCart();
  const items = useMemo(() => {
    let m = listMenu().filter(i => i.available);
    if (tab !== "all") m = m.filter(i => i.mealType === tab);
    if (vegOnly) m = m.filter(i => i.veg);
    return m;
  }, [tab, vegOnly]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Today's menu</h1>
          <p className="mt-1 text-muted-foreground">Fresh from our kitchens. Order before 10am for lunch.</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
          <input type="checkbox" checked={vegOnly} onChange={e => setVegOnly(e.target.checked)} className="accent-accent" />
          <Leaf className="h-4 w-4 text-accent" /> Veg only
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-card border hover:bg-muted"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <article key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg">
            <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-muted">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-5xl">{item.mealType === "breakfast" ? "🍳" : item.mealType === "lunch" ? "🍛" : "🍲"}</span>
              )}
              <Badge className="absolute left-3 top-3 capitalize" variant="secondary">{item.mealType}</Badge>
              <Badge className={`absolute right-3 top-3 ${item.veg ? "bg-accent" : "bg-destructive"} text-white`}>
                {item.veg ? <><Leaf className="mr-1 h-3 w-3" />Veg</> : <><Drumstick className="mr-1 h-3 w-3" />Non-veg</>}
              </Badge>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">₹{item.price}</span>
                <Button size="sm" onClick={() => { add(item); toast.success(`Added ${item.name}`); }}>
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && <p className="mt-16 text-center text-muted-foreground">No dishes match your filters.</p>}
    </main>
  );
}
