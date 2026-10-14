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
import { PlatformLogo } from "@/components/brand";
import { HowItWorks, AISearch, Results, Pricing, FAQ } from "@/components/marketing/sections";
import { HeroSearch, MapsShowcase } from "@/components/marketing/search-experience";
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

function Index() {
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
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-7 text-muted-foreground">
              Set it up once in 5 minutes to capture high-intent buyers and get found everywhere. We
              handle the rest. No SEO agency. Just more profitable customers.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="glow-button h-12 rounded-full px-7 font-medium" asChild>
                <Link to="/dashboard">
                  Get started <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-background/80 px-6 font-medium shadow-sm hover:bg-background"
                asChild
              >
                <Link to="/dashboard">
                  <Play className="mr-2 size-3.5 fill-current" /> View live demo
                </Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
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
      <section className="border-b border-border bg-background px-6 pb-12 pt-8">
        <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          CONTINUOUSLY INDEXED & PROMOTED ACROSS:
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-6 text-foreground/75 sm:gap-x-12">
          {[
            "WordPress",
            "Shopify",
            "Webflow",
            "Ghost",
            "Wix",
            "Squarespace",
            "ChatGPT",
            "Perplexity",
            "Gemini",
            "Google",
          ].map((n) => (
            <div
              key={n}
              className="integration-logo flex items-center transition-all duration-300 hover:text-foreground"
            >
              <PlatformLogo name={n} />
            </div>
          ))}
        </div>
      </section>
      <MapsShowcase />
      <HowItWorks />
      <AISearch />
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
    </MarketingShell>
  );
}
