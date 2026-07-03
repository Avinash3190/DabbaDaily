import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — DabbaDaily" }, { name: "description", content: "Sign in to your DabbaDaily account." }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      navigate({ to: u.role === "admin" ? "/admin" : "/menu" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally { setLoading(false); }
  };

  const google = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{t("auth.welcomeBack")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("auth.continueOrder")}</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2"><Label htmlFor="email">{t("auth.email")}</Label><Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="password">{t("auth.password")}</Label><Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? t("auth.signingIn") : t("auth.signIn")}</Button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> {t("auth.continueWith")} <div className="h-px flex-1 bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={google} disabled={googleLoading}>
          <GoogleIcon className="mr-2 h-4 w-4" />
          {googleLoading ? t("auth.connecting") : t("auth.google")}
        </Button>
        <div className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-medium">Demo admin:</p>
          <p>admin@tiffin.in / admin123</p>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("auth.newHere")} <Link to="/register" className="font-medium text-primary hover:underline">{t("auth.createAccount")}</Link>
        </p>
      </div>
    </main>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12S6.8 21.4 12 21.4c6.9 0 9.5-4.8 9.5-7.3 0-.5 0-.9-.1-1.3H12z"/>
    </svg>
  );
}

