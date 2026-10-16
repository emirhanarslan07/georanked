import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Zap,
  Code,
  ShieldCheck,
  CheckCircle2,
  Send,
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

export const Route = createFileRoute("/formpulse")({
  head: () => ({
    meta: [
      { title: "FormPulse AI — The Serverless Form Backend That Auto-Replies" },
      {
        name: "description",
        content:
          "Connect an HTML or Next.js form to collect leads without backend code. FormPulse answers customer questions with personalized AI responses automatically.",
      },
      { property: "og:title", content: "FormPulse AI — Serverless Form Backend & AI Responder" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FormPulsePage,
});

function FormPulsePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

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
              2026 VERIFIED MODEL: $1,151/MO STRIPE VALIDATED
            </div>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.1] sm:text-[60px]">
              The HTML form backend
              <br />
              <span className="brand-gradient">that replies and closes for you.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-muted-foreground">
              Connect an HTML, Framer, Webflow, or Next.js form in 30 seconds. No server code.
              FormPulse filters spam and sends an instant, personalized AI reply to your leads based on your website's knowledge base.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => setDialogOpen(true)}
                className="glow-button h-12 rounded-full px-7 font-medium"
              >
                Get Started Free (50 submissions/mo) <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Code Snippet Card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Code className="size-4 text-primary" />
                <span>One-line HTML integration</span>
              </div>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                Zero JavaScript Required
              </span>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground/90">
{`<form action="https://api.formpulse.io/f/your_key" method="POST">
  <input type="email" name="email" placeholder="Your email" required />
  <textarea name="message" placeholder="How can we help?"></textarea>
  <button type="submit">Send Message</button>
</form>`}
            </pre>
          </div>

          {/* Features */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Zap className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">Instant AI Auto-Reply</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Answers customer pricing, scheduling, and capability questions within 10 seconds of submission.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <ShieldCheck className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">99.9% Spam Shield</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Automated honeypot and AI sentiment analysis weeds out bot submissions without annoying captchas.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <Mail className="size-6 text-primary" />
              <h3 className="mt-3 text-base font-semibold">Webhook & Zapier Ready</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Pushes leads directly to your Slack channel, Notion database, or CRM in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Claim Your FormPulse Access</DialogTitle>
            <DialogDescription>
              Start collecting submissions and sending AI auto-replies in 30 seconds.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
              <h4 className="mt-3 font-semibold">Your Endpoint is Ready!</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                We've sent your free API endpoint key and integration snippet to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-foreground">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="founder@mystartup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Your Website URL</label>
                <input
                  type="url"
                  placeholder="https://mystartup.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="glow-button w-full">
                Generate Form Endpoint Key
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </MarketingShell>
  );
}
