import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSession, login as doLogin, logout as doLogout, register as doRegister, oauthSignIn, seed, type User } from "./store";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

type Ctx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (input: { name: string; email: string; password: string; phone?: string }) => Promise<User>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  refresh: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refresh = () => {
    const s = getSession();
    setUser(s?.user ?? null);
    setToken(s?.token ?? null);
  };

  useEffect(() => {
    seed();
    const s = getSession();
    if (s) { setUser(s.user); setToken(s.token); }

    // Bridge Supabase OAuth session into the local store (Google sign-in).
    supabase.auth.getUser().then(({ data }) => {
      const su = data.user;
      if (!su?.email) return;
      const local = getSession();
      if (local?.user.email === su.email) return;
      const name = (su.user_metadata?.full_name as string | undefined) || (su.user_metadata?.name as string | undefined);
      oauthSignIn({ email: su.email, name });
      refresh();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event === "SIGNED_IN" && sess?.user?.email) {
        const su = sess.user;
        const name = (su.user_metadata?.full_name as string | undefined) || (su.user_metadata?.name as string | undefined);
        oauthSignIn({ email: su.email!, name });
        refresh();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <AuthCtx.Provider value={{
      user, token,
      login: async (e, p) => { const u = doLogin(e, p); refresh(); return u; },
      register: async (i) => { const u = doRegister(i); refresh(); return u; },
      loginWithGoogle: async () => {
        const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
        if (result.error) throw result.error instanceof Error ? result.error : new Error(String(result.error));
      },
      logout: () => { doLogout(); supabase.auth.signOut().catch(() => {}); refresh(); },
      refresh,
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
