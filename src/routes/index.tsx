import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  Check,
  Link2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/shell";
import { PlatformLogo, TrustedLogos } from "@/components/brand";
import { HowItWorks, AISearch, Results, Pricing, FAQ } from "@/components/marketing/sections";
import { HeroSearch, MapsShowcase, InteractiveRoiCalculator } from "@/components/marketing/search-experience";
import heroBackground from "@/assets/search-background.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeoRanked — Get found on Google & AI. Automatically." },
      {
        name: "description",
        content:
          "Autonomous SEO and Generative Engine Optimization. Discover keywords, create expert articles, and grow visibility on Google, ChatGPT, and Perplexity.",
      },
      { property: "og:title", content: "GeoRanked — Your organic growth, on autopilot" },
      {
        property: "og:description",
        content:
          "Get found on Google and AI search with autonomous content. Explore the live interactive demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

import { useState } from "react";
import { TrialSignupModal } from "@/components/TrialSignupModal";

function Index() {
  const [domain, setDomain] = useState("");
  const [showTrialModal, setShowTrialModal] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setShowTrialModal(true);
  };

  return (
    <MarketingShell>
      <section className="hero-surface overflow-hidden px-5 pb-10 pt-32 sm:pt-36">
        <img src={heroBackground} className="hero-art" alt="" width={1920} height={1024} />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5 text-primary" />
              GOOGLE, CHATGPT, AND PERPLEXITY RANKING
            </div>
            <h1 className="mt-6 text-[39px] font-bold leading-[1.1] sm:text-[62px]">
              Get customers from
              <br className="hidden sm:block" /> Google & AI Search.
              <br />
              <span className="brand-gradient">Automatically.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-muted-foreground">
              Set it up once in 5 minutes to capture high-intent buyers and get found everywhere.
              No $3,000/mo agency retainer. No manual blog writing. Just automated customers.
            </p>

            {/* Interactive Domain Audit Bar (Lead Magnet Hook) */}
            <div className="mx-auto mt-8 max-w-xl">
              <form
                onSubmit={handleHeroSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl sm:rounded-full border border-primary/30 bg-card/95 p-2 shadow-2xl shadow-primary/10 backdrop-blur-md"
              >
                <div className="flex flex-1 items-center gap-2 px-4 py-2 w-full">
                  <span className="text-sm text-muted-foreground select-none">https://</span>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="yoursite.com"
                    className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="glow-button h-12 w-full sm:w-auto rounded-xl sm:rounded-full px-7 text-sm font-bold shrink-0"
                >
                  Get Free Audit <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                ⚡ Instant 60-second scan • Checks Perplexity, SearchGPT & Google AI • 100% Free
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-500">⭐</span> 4.9/5 from 1,156+ verified businesses
              </span>
              <span className="hidden text-muted-foreground/40 sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-success" /> 30-day money-back guarantee
              </span>
            </div>
          </div>
          <div className="float-toast absolute left-0 top-28 hidden w-[188px] -rotate-3 rounded-lg border border-border bg-card/95 p-3.5 soft-shadow xl:block">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-success-soft text-success">
                <Link2 className="size-4" />
              </span>
              <div>
                <strong className="text-xs">+1 High-DR backlink</strong>
                <p className="mt-1 text-[10px] text-muted-foreground">Another win. Zero effort.</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[9px] text-muted-foreground">
              <span className="size-1 rounded-full bg-success" />
              Just now · Your website
            </div>
          </div>
          <div className="float-toast absolute right-0 top-36 hidden w-[190px] rotate-3 rounded-lg border border-border bg-card/95 p-3.5 soft-shadow xl:block">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
                <Sparkles className="size-4" />
              </span>
              <div>
                <strong className="text-xs">Cited by Perplexity</strong>
                <p className="mt-1 text-[10px] text-muted-foreground">You're part of the answer.</p>
              </div>
            </div>
            <div className="mt-3 text-[9px] text-muted-foreground">✦ AI visibility is growing</div>
          </div>
          <HeroSearch />
        </div>
      </section>
      {/* High-Authority Logo Cloud */}
      <section className="border-b border-border/80 bg-muted/20 px-6 py-10">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          CITED & CONTINUOUSLY INDEXED ACROSS LEADING AI ENGINES & PLATFORMS
        </p>
        <TrustedLogos />

        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border/40 pt-5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/70">1-Click Direct CMS Connect:</span>
          {["WordPress", "Shopify", "Webflow", "Ghost", "Wix", "Squarespace"].map((n) => (
            <span key={n} className="inline-flex items-center gap-1.5 font-medium hover:text-foreground transition-colors">
              <PlatformLogo name={n} iconOnly className="size-3.5" />
              {n}
            </span>
          ))}
        </div>
      </section>

      <MapsShowcase />
      <HowItWorks />
      <AISearch />
      <InteractiveRoiCalculator />
      <Results />
      <Pricing />
      <FAQ />
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-accent/20 to-accent/40 px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Sparkles className="size-6 text-primary" />
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Your next customer is searching.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Join 1,156+ businesses who stopped guessing and started dominating Google and AI search
            with GeoRanked.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              className="glow-button h-12 rounded-full px-8 text-sm font-semibold"
              size="lg"
              asChild
            >
              <Link to="/dashboard">
                Get started with GeoRanked <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-success" /> 2-minute setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-success" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-success" /> 30-day money-back guarantee
            </span>
          </div>
        </div>
      </section>

      <TrialSignupModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        defaultDomain={domain}
      />
    </MarketingShell>
  );
}
