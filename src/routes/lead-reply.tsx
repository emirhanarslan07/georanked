import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldAlert,
  Send,
  DollarSign,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/shell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/lead-reply")({
  head: () => ({
    meta: [
      { title: "LeadReply AI — Autonomous Comment Moderation & Instant DM Closer" },
      {
        name: "description",
        content:
          "Hide ad spam instantly and convert high-intent Instagram, Facebook and TikTok comments into paying customers via automated DM replies.",
      },
      { property: "og:title", content: "LeadReply AI — Social Commerce Growth on Autopilot" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LeadReplyPage,
});

function LeadReplyPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [brandHandle, setBrandHandle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <MarketingShell>
      <section className="hero-surface overflow-hidden px-5 pb-16 pt-32 sm:pt-36">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5 text-primary" />
              2026 VERIFIED MODEL: $12,355/MO PADDLE VALIDATED
            </div>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.1] sm:text-[60px]">
              Turn Ad Comments into Revenue.
              <br />
              <span className="brand-gradient">Filter spam & close DMs on autopilot.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-muted-foreground">
              Every hour a customer asks "price?", "shipping to UK?", or "in stock?" in your ad comments,
              unanswered questions kill conversions. LeadReply hides toxicity in 3 seconds and DMs the buyer with product checkout links.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => setDialogOpen(true)}
                className="glow-button h-12 rounded-full px-7 font-medium"
              >
                Start 7-Day Free Pilot ($49/mo) <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Simulation Card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Live Comment Triage Simulation
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="size-4 text-rose-500" />
                  <span>"Check out my crypto scam link here www.fake..."</span>
                </div>
                <span className="rounded bg-rose-500/10 px-2 py-0.5 font-medium text-rose-600">
                  Auto-Hidden (0.8s)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <MessageSquare className="size-4 text-emerald-500" />
                  <span>"Do you deliver to London? Need this by Friday!"</span>
                </div>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600">
                  Instant DM Sent with UK Expedited Link
                </span>
              </div>
            </div>
          </div>

          {/* Metrics & Features */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <TrendingUp className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">+24% ROAS Recovery</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Recapture lost sales from paid Instagram and TikTok ad comments immediately.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <DollarSign className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">Zero Agency Retainer</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Replaces costly manual moderation teams with 24/7 autonomous brand-safe AI.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Send className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">Meta & TikTok Verified</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Official Graph API integration compliant with anti-spam and privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start LeadReply AI Pilot</DialogTitle>
            <DialogDescription>
              Test autonomous moderation and DM closer on your brand account for 7 days.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
              <h4 className="mt-3 font-semibold">Pilot Request Received!</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Our onboarding team will contact you to connect your Meta/TikTok business account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-foreground">Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="marketing@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Instagram / TikTok Handle</label>
                <input
                  type="text"
                  required
                  placeholder="@yourbrand"
                  value={brandHandle}
                  onChange={(e) => setBrandHandle(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="glow-button w-full">
                Activate 7-Day Pilot ($49/mo)
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </MarketingShell>
  );
}
