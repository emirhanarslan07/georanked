import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck, Globe, Mail, Loader2, Check } from "lucide-react";

interface TrialSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export function TrialSignupModal({ isOpen, onClose, defaultDomain = "" }: TrialSignupModalProps) {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState(defaultDomain);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const cleanDomainStr = (raw: string) => {
    return raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  };

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || !domain.trim()) return;

    const cleanedDomain = cleanDomainStr(domain);
    setLoading(true);

    try {
      // 1. Post lead to internal notify-lead endpoint
      await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "trial_signup",
          email: email.trim(),
          domain: cleanedDomain,
          website: `https://${cleanedDomain}`,
          plan: "3-Day Free Trial ($79/mo tier)",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      // Ignore network errors to guarantee user entry
    }

    // 2. Save session to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "georanked_session",
        JSON.stringify({
          email: email.trim(),
          domain: cleanedDomain,
          freeArticlesLeft: 3,
          trialActive: true,
          expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
        })
      );
      // 3. Forward directly to dashboard
      window.location.href = `/dashboard?domain=${encodeURIComponent(cleanedDomain)}&email=${encodeURIComponent(email.trim())}&trial=active`;
    }
  };

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    // Instant Google OAuth simulation with user prompt or fallback
    const promptEmail = prompt("Enter your Google Account email to continue:", email || "founder@startup.com");
    if (promptEmail && promptEmail.includes("@")) {
      const derivedDomain = domain.trim() || promptEmail.split("@")[1];
      const cleaned = cleanDomainStr(derivedDomain);
      setEmail(promptEmail);
      setDomain(cleaned);

      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "google_oauth_signup",
          email: promptEmail,
          domain: cleaned,
          website: `https://${cleaned}`,
          plan: "3-Day Free Trial (Google OAuth)",
          timestamp: new Date().toISOString(),
        }),
      }).finally(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "georanked_session",
            JSON.stringify({
              email: promptEmail,
              domain: cleaned,
              freeArticlesLeft: 3,
              trialActive: true,
              expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
            })
          );
          window.location.href = `/dashboard?domain=${encodeURIComponent(cleaned)}&email=${encodeURIComponent(promptEmail)}&trial=active`;
        }
      });
    } else {
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100vw-32px)] sm:max-w-md p-6 sm:p-8 rounded-2xl border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
            <Sparkles className="size-6" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
            Start your 3-day free trial
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Generate 3 autonomous GEO articles for your website. No credit card required.
          </DialogDescription>
        </DialogHeader>

        {/* 1-Click Google Sign In */}
        <div className="mt-5 space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleAuth}
            disabled={googleLoading || loading}
            className="w-full h-11 border-border/80 hover:bg-accent font-medium text-xs sm:text-sm gap-2.5 rounded-xl shadow-sm"
          >
            {googleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative my-4 flex items-center justify-center">
            <span className="w-full border-t border-border" />
            <span className="absolute bg-background px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              or continue with email
            </span>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                Website Domain
              </label>
              <div className="flex items-center rounded-xl border border-input bg-card px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm">
                <Globe className="mr-2 size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground select-none mr-0.5">https://</span>
                <input
                  type="text"
                  placeholder="yourcompany.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                Work Email
              </label>
              <div className="flex items-center rounded-xl border border-input bg-card px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm">
                <Mail className="mr-2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email.trim() || !domain.trim()}
              className="glow-button w-full h-12 rounded-xl text-xs sm:text-sm font-bold mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Preparing Workspace...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Start 3-Day Free Trial <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Check className="size-3.5 text-success" /> 3 free articles
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="size-3.5 text-success" /> No credit card
            </span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
