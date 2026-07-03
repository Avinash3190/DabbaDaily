import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Clock, ShieldCheck, Truck, Leaf, Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DabbaDaily — Home-style tiffins delivered daily" },
      { name: "description", content: "Subscribe to fresh, home-cooked breakfast, lunch and dinner tiffins. Veg & non-veg menus, daily delivery." },
      { property: "og:title", content: "DabbaDaily — Home-style tiffins delivered daily" },
      { property: "og:description", content: "Subscribe to fresh, home-cooked breakfast, lunch and dinner tiffins." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const features = [
    { icon: Leaf, title: t("home.features.cookTitle"), text: t("home.features.cookText") },
    { icon: Truck, title: t("home.features.deliveryTitle"), text: t("home.features.deliveryText") },
    { icon: ShieldCheck, title: t("home.features.hygieneTitle"), text: t("home.features.hygieneText") },
  ];
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Flame className="h-3.5 w-3.5" /> {t("home.badge")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {t("home.title1")} <span className="text-primary">{t("home.title2")}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><Link to="/menu">{t("home.viewMenu")}</Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/register">{t("home.startSub")}</Link></Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-6 text-sm">
              <div><div className="text-2xl font-bold text-primary">5k+</div><div className="text-muted-foreground">{t("home.stats.customers")}</div></div>
              <div><div className="text-2xl font-bold text-primary">30+</div><div className="text-muted-foreground">{t("home.stats.dishes")}</div></div>
              <div><div className="text-2xl font-bold text-primary">99%</div><div className="text-muted-foreground">{t("home.stats.ontime")}</div></div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 md:h-96 md:w-96">
              <div className="absolute inset-6 rounded-full bg-card shadow-2xl flex items-center justify-center">
                <UtensilsCrossed className="h-32 w-32 text-primary" strokeWidth={1.2} />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2 text-sm font-medium"><Leaf className="h-4 w-4 text-accent" /> {t("home.fresh")}</div>
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2 text-sm font-medium"><Clock className="h-4 w-4 text-primary" /> {t("home.lunchBy")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold tracking-tight">{t("home.whyTitle")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: I, title, text }) => (
              <div key={title} className="rounded-2xl border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><I className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

