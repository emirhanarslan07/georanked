import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Search,
  FileText,
  Send,
  Sparkles,
  Clock,
  Wallet,
  EyeOff,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIComparison } from "@/components/marketing/search-experience";
import { TrafficChart } from "@/components/traffic-chart";
import { EarlyAccessModal } from "@/components/EarlyAccessModal";
import { TrialSignupModal } from "@/components/TrialSignupModal";
export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{label}</div>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}
export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        label="Your growth. On autopilot."
        title="Less busywork. More business."
        description="An entire SEO team, working for you around the clock."
      />
      <div className="mb-12 grid gap-4 md:grid-cols-3">
        {[
          [Clock, "4+ hours for a single post"],
          [Wallet, "$4,000/month agency retainers"],
          [EyeOff, "Invisible in AI search"],
        ].map(([Icon, text]) => {
          const I = Icon as typeof Clock;
          return (
            <div
              key={String(text)}
              className="flex items-center gap-3 rounded-lg border border-destructive/10 bg-danger-soft p-5 text-sm"
            >
              <I className="size-5 text-destructive" />
              <span>{String(text)}</span>
              <span className="ml-auto text-destructive">×</span>
            </div>
          );
        })}
      </div>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            Search,
            "Discover opportunities",
            "Find the keywords your customers actually search for.",
          ],
          [
            FileText,
            "Create expert content",
            "Answer-first articles, built for humans and AI engines.",
          ],
          [Send, "Publish automatically", "Fresh content goes straight to your CMS. Every day."],
          [
            Sparkles,
            "Get found everywhere",
            "Rank on Google. Get cited by ChatGPT and Perplexity.",
          ],
        ].map(([Icon, title, desc], i) => {
          const I = Icon as typeof Search;
          return (
            <div key={String(title)}>
              <div className="mb-5 flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-lg bg-accent text-primary">
                  <I className="size-6" />
                </span>
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="font-bold">{String(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{String(desc)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export function Results() {
  return (
    <section className="border-y border-border bg-muted px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label="Compounding growth"
          title="Your next growth curve starts here."
          description="Great content doesn't just bring clicks. It brings your next customer."
        />
        <TrafficChart />
        <div className="mt-8 grid grid-cols-3 text-center">
          {[
            ["184%", "more organic traffic"],
            ["3.2×", "AI search visibility"],
            ["0 hrs", "of manual publishing"],
          ].map(([a, b]) => (
            <div key={a}>
              <div className="text-2xl font-bold sm:text-3xl">{a}</div>
              <div className="mt-2 text-xs text-muted-foreground sm:text-sm">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
      <SectionHeading
        label="Transparent, One-Time Deliverables"
        title="Actionable AI Search Audits. No Monthly Subscriptions."
        description="Get cited in ChatGPT, Perplexity, and Google AI Overviews. Pay once, receive your customized report in 24 hours."
      />

      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {/* Tier 1: Free */}
        <div className="relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/50">
          <h3 className="text-lg font-bold">Free Instant Check</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Test your public domain across ChatGPT and Perplexity in 60 seconds.
          </p>
          <div className="my-7">
            <strong className="text-4xl font-extrabold">$0</strong>
            <span className="text-sm text-muted-foreground font-medium"> / forever free</span>
          </div>
          <Button variant="outline" className="font-semibold rounded-xl h-12" asChild>
            <a href="/free-audit">
              Run Free Check <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <ul className="mt-7 space-y-3.5 text-sm">
            {[
              "Instant 60-second AI citation scan",
              "Competitor recommendation check",
              "Basic Schema & Entity detection",
              "Top 3 citation gaps identified",
              "No credit card required"
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Check className="size-4 text-success shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tier 2: $49 One-Time (Featured) */}
        <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-2xl shadow-primary/10 transition-transform hover:-translate-y-1">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold text-primary-foreground tracking-wide uppercase">
            ⭐ Most Popular — 24h Delivery
          </span>
          <h3 className="text-lg font-bold">15-Page AI Visibility Blueprint</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Full forensic breakdown of your city & niche across all major AI search engines.
          </p>
          <div className="my-7">
            <strong className="text-4xl font-extrabold text-foreground">$49</strong>
            <span className="text-sm text-muted-foreground font-medium"> / one-time payment</span>
          </div>
          <Button className="glow-button font-bold rounded-xl h-12 shadow-lg" asChild>
            <a
              href="https://buy.polar.sh/polar_cl_O9bjWaIMCUHrVeRAE6xtDtBnLAapgiqBRYwAU10ESqm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order 24h Audit ($49) <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <ul className="mt-7 space-y-3.5 text-sm">
            {[
              "15-page customized PDF & Markdown report",
              "ChatGPT, Perplexity & Gemini audit for your city",
              "Competitor citation sources & review platforms",
              "Ready-to-paste LocalBusiness Schema JSON-LD code",
              "Human-reviewed by our GEO search engineers",
              "Delivered to your inbox in 24 hours",
              "Zero monthly subscription or recurring fees"
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                <Check className="size-4 text-success shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tier 3: $149 One-Time */}
        <div className="relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/50">
          <h3 className="text-lg font-bold">Audit + Schema Implementation</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We handle the code and citation push for you. Complete hands-free setup.
          </p>
          <div className="my-7">
            <strong className="text-4xl font-extrabold">$149</strong>
            <span className="text-sm text-muted-foreground font-medium"> / one-time payment</span>
          </div>
          <Button variant="outline" className="font-semibold rounded-xl h-12" asChild>
            <a
              href="https://buy.polar.sh/polar_cl_O9bjWaIMCUHrVeRAE6xtDtBnLAapgiqBRYwAU10ESqm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Hands-Free Setup <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <ul className="mt-7 space-y-3.5 text-sm">
            {[
              "Everything in the 15-Page $49 Blueprint",
              "Custom JSON-LD Schema engineered for your site",
              "Direct injection instructions or CMS setup assistance",
              "Entity submissions to top AI-crawled directories",
              "7-day post-implementation re-verification check",
              "Priority 12-hour report delivery"
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Check className="size-4 text-success shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        <strong>Guaranteed Turnaround:</strong> Every audit is compiled within 24 business hours. No subscription lock-in, no hidden charges.
      </div>
    </section>
  );
}

export function AISearch() {
  return <AIComparison />;
}
export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading label="Good questions" title="A little clarity before you grow." />
      <div className="divide-y divide-border">
        {[
          [
            "How does GeoRanked work?",
            "Connect your website, choose your niche topics, and let GeoRanked autonomously discover high-intent keywords, create comprehensive articles, and publish directly to your CMS. You can explore the interactive dashboard anytime.",
          ],
          [
            "What is GEO, and why does it matter?",
            "Generative Engine Optimization (GEO) helps your brand become the primary cited source in AI models like Perplexity, ChatGPT, and Gemini, alongside traditional Google search rankings.",
          ],
          [
            "Can I review articles before they go live?",
            "Yes! Articles can be held as drafts for review or published on an automated schedule. The Scale Agency plan also includes Telegram 1-click approvals.",
          ],
          [
            "Which platforms can I connect?",
            "GeoRanked natively connects to WordPress, Shopify, Webflow, Ghost, Wix, and custom static sites with seamless webhooks and APIs.",
          ],
          [
            "Does it guarantee rankings or AI citations?",
            "While no ethical tool can guarantee exact #1 positions, GeoRanked follows the exact multi-source semantic architecture that LLMs and Google ranking algorithms prioritize.",
          ],
        ].map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
              {q}
              <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
