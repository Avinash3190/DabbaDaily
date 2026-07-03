import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, UtensilsCrossed, LogOut, User as UserIcon, Bell, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DabbaDaily</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/menu" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>{t("nav.menu")}</Link>
          {user && (
            <Link to="/orders" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>{t("nav.orders")}</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4" />{t("nav.admin")}</span>
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/cart" })} aria-label={t("nav.cart")} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/notifications" })} aria-label={t("nav.notifications")}><Bell className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/profile" })} aria-label={t("nav.profile")}><UserIcon className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => { logout(); navigate({ to: "/" }); }} aria-label={t("nav.logout")}><LogOut className="h-5 w-5" /></Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate({ to: "/login" })}>{t("nav.login")}</Button>
              <Button onClick={() => navigate({ to: "/register" })}>{t("nav.signup")}</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
