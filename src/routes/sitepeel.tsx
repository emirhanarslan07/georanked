import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  MonitorSmartphone,
  Eye,
  Camera,
  Code2,
  Palette,
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

export const Route = createFileRoute("/sitepeel")({
  head: () => ({
    meta: [
      { title: "Sitepeel — 13-in-1 Web & Design Inspection Suite" },
      {
        name: "description",
        content:
          "Inspect websites, compare responsive layouts, capture full-page screenshots, extract CSS, and export Design Markdown in one click.",
      },
      { property: "og:title", content: "Sitepeel — Frontend & UI Toolkit for Developers" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SitepeelPage,
});

function SitepeelPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [inputUrl, setInputUrl] = useState("https://overrank-ai.vercel.app");

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
              2026 VERIFIED MODEL: $96/MO DODOPAYMENTS VALIDATED
            </div>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.1] sm:text-[60px]">
              Every web inspection tool.
              <br />
              <span className="brand-gradient">In a single, lightning-fast suite.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-muted-foreground">
              Compare mobile, tablet and desktop layouts side-by-side, extract production CSS and color tokens,
              capture full-page retina screenshots, and export Design Markdown for AI coding assistants.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => setDialogOpen(true)}
                className="glow-button h-12 rounded-full px-7 font-medium"
              >
                Get Developer Pass ($29 Lifetime) <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>

          {/* Interactive URL Inspector Card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={() => setDialogOpen(true)} className="glow-button rounded-xl px-6">
                Inspect Website Free
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <MonitorSmartphone className="mx-auto size-5 text-primary" />
                <span className="mt-1 block text-xs font-medium">Responsive View</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <Camera className="mx-auto size-5 text-primary" />
                <span className="mt-1 block text-xs font-medium">Retina Snapshots</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <Code2 className="mx-auto size-5 text-primary" />
                <span className="mt-1 block text-xs font-medium">Design MD Export</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <Palette className="mx-auto size-5 text-primary" />
                <span className="mt-1 block text-xs font-medium">CSS Color Tokens</span>
              </div>
            </div>
          </div>

          {/* Value Highlights */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Eye className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">13 Essential Tools</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Replaces 5 separate Chrome extensions with a unified, clean interface for designers and developers.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Code2 className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">LLM & Cursor Ready</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Exports structured Design MD that can be fed directly to Claude, Cursor, and v0 to replicate components.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Sparkles className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">Lifetime License</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                No monthly subscriptions. Pay once ($29) and keep lifetime updates forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Sitepeel Lifetime Pass</DialogTitle>
            <DialogDescription>
              One-time $29 developer pass with unlimited audits and Design MD exports.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
              <h4 className="mt-3 font-semibold">Early Pass Reserved!</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                We'll email your activation license and browser extension link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-foreground">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="dev@studio.design"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="glow-button w-full">
                Claim $29 Lifetime Pass
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </MarketingShell>
  );
}
