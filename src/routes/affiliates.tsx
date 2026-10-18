import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Users,
  Repeat,
  Percent,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "GeoRanked Affiliate Partner Program — Earn 30% Lifetime Recurring Commission" },
      {
        name: "description",
        content:
          "Partner with GeoRanked. Earn 30% monthly recurring commission for every customer you refer to the autonomous Generative Engine Optimization platform.",
      },
    ],
  }),
  component: AffiliatesPage,
});

function AffiliatesPage() {
  const [referrals, setReferrals] = useState(25);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [applied, setApplied] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState("");

  const planPrice = 79; // Average plan price
  const monthlyEarnings = Math.round(referrals * planPrice * 0.3);
  const annualEarnings = monthlyEarnings * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    const code = name.toLowerCase().replace(/[^a-z0-9]/g, "") || "partner";
    const link = `https://georanked.vercel.app?ref=${code}`;
    setAffiliateLink(link);
    setApplied(true);

    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("event", {
        name: "affiliate_registered",
        data: { name, email, channel, code },
      });
    }

    try {
      const stored = JSON.parse(localStorage.getItem("georanked_affiliates") || "[]");
      stored.push({ name, email, channel, code, date: new Date().toISOString() });
      localStorage.setItem("georanked_affiliates", JSON.stringify(stored));
    } catch (e) {}
  };

  return (
    <MarketingShell>
      <div className="min-h-screen px-4 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Percent className="size-3.5 text-primary" />
              GEORANKED PARTNER PROGRAM
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Earn <span className="brand-gradient">30% Monthly Recurring</span> Commission for Life
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Help SaaS founders, Shopify store owners, and indie hackers dominate ChatGPT and
              Google AI search. Earn passive recurring income every month as long as they stay subscribed.
            </p>
          </div>

          {/* Earnings Calculator Card */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-card p-7 shadow-2xl sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Interactive Revenue Estimator
                </span>
                <h3 className="mt-1 text-2xl font-bold">How much can you earn?</h3>
                <p className="text-xs text-muted-foreground">
                  Based on 30% recurring cut of our $79/mo average customer retainer.
                </p>
              </div>

              <div className="text-right">
                <span className="block text-3xl font-extrabold text-success sm:text-4xl">
                  ${monthlyEarnings.toLocaleString()}
                  <span className="text-sm font-medium text-muted-foreground"> / month</span>
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  (${annualEarnings.toLocaleString()} / year passive)
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                <span>5 referrals</span>
                <span className="text-primary font-bold text-sm">{referrals} active paying customers</span>
                <span>200 referrals</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={referrals}
                onChange={(e) => setReferrals(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
              />
            </div>

            {/* Feature Perks */}
            <div className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3 text-center">
              <div>
                <div className="text-xl font-bold text-primary">30% Lifetime</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Not just one-off. Recurring revenue every 30 days.
                </p>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">60-Day Cookie</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  If they click and buy within 60 days, you get credited.
                </p>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">Monthly Payouts</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Paid directly via PayPal, Wise, or Stripe on the 1st of each month.
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-7 shadow-xl sm:p-10">
            {!applied ? (
              <>
                <h3 className="text-2xl font-bold">Join the GeoRanked Affiliate Network</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Instant approval. Start sharing your referral link with your audience today.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Rivera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Payout Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Where will you promote GeoRanked? (Twitter / YouTube / TikTok / Newsletter / Agency Clients)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Twitter audience of 8k founders, tech newsletter, TikTok SEO channel"
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium outline-none focus:border-primary"
                    />
                  </div>

                  <Button type="submit" size="lg" className="glow-button mt-4 h-12 w-full rounded-xl font-bold">
                    Generate My 30% Affiliate Link <ArrowRight className="ml-2 size-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold">Welcome to the Partner Team!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your 30% lifetime recurring commission link has been generated.
                </p>

                <div className="mx-auto mt-6 max-w-lg rounded-xl border border-primary/30 bg-accent/40 p-4">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Personal Referral Link:
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 border border-border">
                    <span className="text-xs font-mono font-bold text-primary truncate">
                      {affiliateLink}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(affiliateLink);
                        alert("Affiliate link copied to clipboard!");
                      }}
                      className="h-8 rounded-md px-3 text-xs"
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" asChild>
                    <Link to="/free-audit">Test Free Audit Tool ↗</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}
