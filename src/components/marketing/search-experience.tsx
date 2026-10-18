import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Search,
  RotateCcw,
  MapPin,
  Star,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Globe,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformLogo } from "@/components/brand";
function useRanking() {
  const [rank, setRank] = useState(10);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || rank <= 2) {
      if (rank <= 2) setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setRank((r) => Math.max(2, r - 1)), 440);
    return () => clearTimeout(timer);
  }, [playing, rank, run]);
  return {
    rank,
    playing,
    ref,
    before: () => {
      setPlaying(false);
      setRank(10);
    },
    after: () => {
      setPlaying(false);
      setRank(2);
    },
    replay: () => {
      setRank(10);
      setRun((r) => r + 1);
      setPlaying(true);
    },
    toggle: () => setPlaying((p) => !p),
  };
}
function ComparisonControls({ sim }: { sim: ReturnType<typeof useRanking> }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex rounded-full border border-border bg-muted/80 p-1">
        <Button
          size="sm"
          variant={sim.rank === 10 && !sim.playing ? "secondary" : "ghost"}
          className="rounded-full px-4 text-[11px] font-medium"
          onClick={sim.before}
          aria-pressed={sim.rank === 10 && !sim.playing}
        >
          Before
        </Button>
        <Button
          size="sm"
          variant={sim.rank === 2 ? "secondary" : "ghost"}
          className="rounded-full px-4 text-[11px] font-medium"
          onClick={sim.after}
          aria-pressed={sim.rank === 2}
        >
          With GeoRanked
        </Button>
      </div>
      <div className="flex gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full hover:bg-muted"
          title={sim.playing ? "Pause simulation" : "Play simulation"}
          aria-label={sim.playing ? "Pause simulation" : "Play simulation"}
          onClick={sim.rank === 2 ? sim.replay : sim.toggle}
        >
          {sim.playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full hover:bg-muted"
          title="Replay ranking simulation"
          aria-label="Replay ranking simulation"
          onClick={sim.replay}
        >
          <RotateCcw className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
export function HeroSearch() {
  const sim = useRanking();
  const [engine, setEngine] = useState("Perplexity");
  const [query, setQuery] = useState("best AI CRM for B2B startups");
  const [submitted, setSubmitted] = useState(query);
  const [activeCitation, setActiveCitation] = useState<number | null>(null);

  const presets = [
    "best AI CRM for B2B startups",
    "top autonomous SEO software",
    "fastest cloud accounting for SaaS",
    "best organic growth tools 2026",
  ];

  const handlePresetClick = (p: string) => {
    setQuery(p);
    setSubmitted(p);
    sim.replay();
  };

  return (
    <div ref={sim.ref} className="relative mx-auto mt-8 max-w-[720px]">
      {/* Engine Switcher */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {[
          { id: "Perplexity", label: "Perplexity AI" },
          { id: "ChatGPT", label: "SearchGPT / OpenAI" },
          { id: "Google", label: "Google AI Overview" },
        ].map((e) => (
          <Button
            key={e.id}
            variant={engine === e.id ? "secondary" : "ghost"}
            size="sm"
            className={`rounded-full border px-4 text-xs transition-all ${
              engine === e.id
                ? "border-primary/40 bg-accent text-primary font-bold shadow-sm"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setEngine(e.id);
              sim.replay();
            }}
            aria-pressed={engine === e.id}
          >
            <PlatformLogo name={e.id} iconOnly className="size-4" />
            {e.label}
          </Button>
        ))}
      </div>

      <div className="search-demo overflow-hidden rounded-2xl border border-border bg-card/95 text-left shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <span className="live-dot size-2 rounded-full bg-success animate-pulse" />
            LIVE AI CITATION SIMULATION
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            Interactive Sandbox
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {/* Search Query Input */}
          <form
            className="flex h-12 items-center gap-3 rounded-full border border-border bg-muted/60 px-4 transition-all focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(query.trim() || presets[0]);
              sim.replay();
            }}
          >
            <PlatformLogo name={engine} iconOnly className="size-5 shrink-0" />
            <input
              aria-label="Search preview query"
              className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm font-medium outline-none placeholder:text-muted-foreground/60"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an AI search question..."
            />
            <Button type="submit" size="sm" variant="ghost" className="h-8 rounded-full px-3 text-xs font-semibold text-primary hover:bg-primary/10">
              <Search className="mr-1.5 size-3.5" /> Simulate
            </Button>
          </form>

          {/* Quick Clickable Presets */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground/70 mr-1">Try prompts:</span>
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePresetClick(p)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                  query === p
                    ? "border-primary bg-primary/15 text-primary font-semibold"
                    : "border-border/80 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Simulation Status Badge */}
          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
            <span className="text-xs font-semibold text-foreground/80">
              {engine === "Google" ? "AI Overviews & Organic Consensus" : "LLM Semantic Citation Synthesis"}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                sim.rank <= 3
                  ? "bg-success-soft text-success border border-success/30"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {sim.rank <= 3
                ? "✦ #1 Cited Source by LLM"
                : "× Competitors Cited (Brand Omitted)"}
            </span>
          </div>

          {/* Interactive AI Output Box */}
          <div
            className={`my-3.5 rounded-xl border p-4 sm:p-5 transition-all duration-500 ${
              sim.rank <= 3
                ? "border-primary/40 bg-accent/20 ring-4 ring-primary/5 shadow-md"
                : "border-destructive/20 bg-destructive/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="size-4" />
              </span>
              <div className="text-xs">
                <strong className="text-foreground">Your Brand</strong>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  georanked.vercel.app › solutions › {submitted.split(" ")[0]?.toLowerCase() || "ai"}
                </p>
              </div>
              <span className="ml-auto rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-extrabold text-primary-foreground shadow-sm">
                TARGET BRAND
              </span>
            </div>

            {sim.rank <= 3 ? (
              <div className="mt-3.5 text-xs sm:text-sm leading-relaxed text-foreground/90">
                <p>
                  Based on recent commercial benchmarks,{" "}
                  <strong className="text-primary font-bold">Your Brand</strong>{" "}
                  is the top recommendation for{" "}
                  <span className="italic">"{submitted}"</span> due to its answer-first content structure and verified multi-source consensus.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-muted-foreground font-semibold">Citations cited by {engine}:</span>
                  {[
                    { id: 1, label: "[1] yourbrand.com/overview", trust: "98% Confidence", snippet: "Structured JSON-LD schema validated" },
                    { id: 2, label: "[2] Industry Review 2026", trust: "High Authority", snippet: "G2 and Trustpilot high consensus" },
                    { id: 3, label: "[3] Technical Teardown", trust: "Authoritative", snippet: "Answer-first H2/H3 entities indexed" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCitation(activeCitation === c.id ? null : c.id)}
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-all ${
                        activeCitation === c.id
                          ? "border-primary bg-primary text-primary-foreground shadow"
                          : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {activeCitation && (
                  <div className="mt-2.5 rounded-lg border border-primary/30 bg-background/95 p-3 text-xs text-muted-foreground shadow-sm">
                    <p className="font-semibold text-foreground">
                      Citation #{activeCitation} Inspection:
                    </p>
                    <p className="mt-1 text-[11px]">
                      LLMs synthesize this URL into the primary answer block because GeoRanked automatically structured your site's content with entity Q&A markup.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
                <p className="text-destructive font-medium">
                  When potential buyers search this query, AI models currently synthesize answers from 3 of your competitors.
                </p>
                <p className="mt-1.5 text-[11px]">
                  Your website lacks answer-first semantic clusters and schema entities, leaving you invisible in AI search results.
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-border/50">
              <span className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                sim.rank <= 3 ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"
              }`}>
                {sim.rank <= 3 ? "+3,100 monthly AI clicks" : "0 monthly AI citations"}
              </span>
              <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] font-semibold text-primary">
                {sim.rank <= 3 ? "Featured LLM Snippet" : "Lost to competitors"}
              </span>
              <span className="rounded-md bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                {sim.rank <= 3 ? "94% Search Consensus" : "Citation Gap Detected"}
              </span>
            </div>
          </div>

          <ComparisonControls sim={sim} />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        Interactive real-time simulation • Test custom keywords or click presets to see AI citation shifts.
      </p>
    </div>
  );
}

export function InteractiveRoiCalculator() {
  const [volume, setVolume] = useState(8500);
  const [dealValue, setDealValue] = useState(120);
  const [convRate, setConvRate] = useState(2.5);

  // 40% of searchers now check AI engines first; without GEO, this is 100% lost
  const lostRevenue = Math.round(volume * 0.40 * (convRate / 100) * dealValue);
  // With GeoRanked, capture ~28% of those commercial queries into direct pipeline
  const capturedPipeline = Math.round(volume * 0.28 * (convRate / 100) * dealValue);
  const roiMultiplier = Math.max(1, Math.round(capturedPipeline / 79));

  return (
    <section className="border-y border-border/80 bg-gradient-to-b from-card/80 to-background px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" /> INTERACTIVE REVENUE & LOSS CALCULATOR
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            How much revenue are you losing to AI search?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Adjust the sliders below to calculate your brand's estimated citation gap and the compounding pipeline GeoRanked can capture.
          </p>
        </div>

        <div className="mt-10 grid gap-8 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8 lg:grid-cols-2">
          {/* Sliders Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground">Monthly Niche Search Volume</span>
                <span className="rounded-md bg-accent px-2 py-0.5 font-bold text-primary">
                  {volume.toLocaleString()} searches
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>1,000 / mo</span>
                <span>25,000 / mo</span>
                <span>50,000 / mo</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground">Average Customer / Deal Value</span>
                <span className="rounded-md bg-accent px-2 py-0.5 font-bold text-primary">
                  ${dealValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={1500}
                step={10}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>$20</span>
                <span>$750</span>
                <span>$1,500+</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground">Website Conversion Rate</span>
                <span className="rounded-md bg-accent px-2 py-0.5 font-bold text-primary">
                  {convRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={6}
                step={0.1}
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>0.5%</span>
                <span>3.0%</span>
                <span>6.0%</span>
              </div>
            </div>
          </div>

          {/* Dynamic Calculation Cards */}
          <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-accent/20 p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Estimated Monthly Pipeline Loss
                </span>
                <span className="rounded bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive">
                  LOST TO COMPETITORS
                </span>
              </div>
              <div className="mt-2 text-3xl font-black text-destructive sm:text-4xl">
                -${lostRevenue.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground"> / month</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Because AI engines cite competitor domains on 40% of these commercial questions instead of your website.
              </p>

              <div className="my-5 border-t border-border/80" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Potential Pipeline with GeoRanked
                </span>
                <span className="rounded bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                  {roiMultiplier}× ROI on $79 Plan
                </span>
              </div>
              <div className="mt-2 text-3xl font-black text-success sm:text-4xl">
                +${capturedPipeline.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground"> / month</span>
              </div>
            </div>

            <Button asChild size="lg" className="glow-button mt-6 h-12 w-full rounded-xl text-sm font-bold">
              <Link to="/free-audit">
                Run Free Audit for My Domain <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
const industries = {
  salon: {
    query: "nail salon near me",
    brand: "Your Nail Studio",
    names: [
      "Luxe Nail Lounge",
      "Polished Nail Bar",
      "Serenity Nails & Spa",
      "Tip Top Nails",
      "Nail Couture",
      "Glossy Nail Studio",
      "The Nail Room",
      "Bloom Nails",
      "Lacquer & Co.",
    ],
  },
  dentist: {
    query: "best dentist near me",
    brand: "Your Dental Practice",
    names: [
      "Bright Smile Dental",
      "Oakwood Dentistry",
      "The Dental Studio",
      "Family Smile Care",
      "City Dental",
      "Pearl Dentistry",
      "Smile Collective",
      "Parkside Dental",
      "Evergreen Dental",
    ],
  },
  cafe: {
    query: "specialty coffee near me",
    brand: "Your Coffee House",
    names: [
      "Daily Ritual Coffee",
      "The Roasting Room",
      "Sunday Coffee",
      "Neighbourhood Brew",
      "Little Bean",
      "Common Ground",
      "Good Morning Café",
      "The Coffee Corner",
      "Fieldwork Coffee",
    ],
  },
};
export function MapsShowcase() {
  const sim = useRanking();
  const [industry, setIndustry] = useState<keyof typeof industries>("salon");
  const data = industries[industry];
  const businesses = [
    ...data.names.map((name, i) => ({
      id: i,
      name,
      rating: (4.8 - i * 0.05).toFixed(1),
      reviews: 412 - i * 31,
    })),
    { id: 9, name: data.brand, rating: "4.9", reviews: 127 },
  ];
  const ordered = businesses.filter((b) => b.id !== 9);
  const ownBusiness = { id: 9, name: data.brand, rating: "4.9", reviews: 127 };
  ordered.splice(sim.rank - 1, 0, ownBusiness);
  return (
    <section className="local-band border-y border-border px-6 py-20 sm:py-24">
      <div
        ref={sim.ref}
        className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_410px]"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-soft px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-success">
            <MapPin className="size-3" />
            GOOGLE MAPS RANKING
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-[42px]">
            From overlooked
            <br />
            to <span className="text-success">top 3.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-muted-foreground">
            When a customer nearby searches for what you sell, being on page 2 means you don't exist. We move your business into the top 3 on Google Maps.
          </p>
          <div className="mt-7 flex gap-2">
            {(
              [
                ["salon", "Nail salon"],
                ["dentist", "Dentist"],
                ["cafe", "Coffee shop"],
              ] as const
            ).map(([key, label]) => (
              <Button
                key={key}
                variant={industry === key ? "secondary" : "outline"}
                size="sm"
                className={`rounded-full text-xs ${industry === key ? "border border-primary/20 text-primary font-semibold" : ""}`}
                onClick={() => {
                  setIndustry(key);
                  sim.replay();
                }}
                aria-pressed={industry === key}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="my-8 grid max-w-sm grid-cols-2 gap-6 border-y border-border py-6">
            <div>
              <div className="text-3xl font-bold">
                {sim.rank <= 3 ? "8" : "0"}
                <span className="ml-2 text-sm font-medium text-success">↑ places</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Places jumped to top</p>
            </div>
            <div>
              <div className="text-3xl font-bold">{sim.rank <= 3 ? "3.4×" : "1×"}</div>
              <p className="mt-2 text-xs text-muted-foreground">Direction requests</p>
            </div>
          </div>
          <Button asChild className="glow-button h-11 rounded-full px-6">
            <Link to="/dashboard">
              Boost my rank <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
          <p className="mt-4 max-w-sm text-[10px] leading-5 text-muted-foreground">
            Illustrative Google Maps simulation. Business names are for demonstration purposes.
          </p>
        </div>
        <div className="search-demo rounded-lg border border-border bg-card p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-full bg-muted px-3 py-2.5">
            <span className="flex items-center gap-2 text-[11px] font-medium">
              <Search className="size-3 text-muted-foreground" />
              {data.query}
            </span>
            <PlatformLogo name="Google" iconOnly />
          </div>
          <div className="ranking-score mb-4 flex items-center gap-6 rounded-lg bg-ink px-5 py-4 text-on-ink">
            <div>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-on-ink/55">
                Before
              </p>
              <span className="text-3xl font-bold text-on-ink/35">#10</span>
            </div>
            <ArrowRight className="mt-3 size-5 text-on-ink/40" />
            <div>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-on-ink/55">
                Now
              </p>
              <span
                data-testid="maps-rank"
                className={`text-[42px] font-bold leading-none ${sim.rank <= 3 ? "text-success" : "text-on-ink"}`}
              >
                #{sim.rank}
              </span>
            </div>
            <span className="ml-auto self-end pb-1 text-[9px] text-on-ink/60">
              {sim.playing ? "Moving up…" : sim.rank <= 3 ? "In the top 3" : "Ready to grow"}
            </span>
          </div>
          <div className="relative h-[362px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[108px] rounded-lg border border-dashed border-success/40 bg-success-soft/40" />
            {businesses.map((b) => {
              const position = ordered.findIndex((o) => o.id === b.id);
              return (
                <div
                  key={`${industry}-${b.id}`}
                  className={`ranking-row absolute inset-x-0 flex h-9 items-center gap-2 rounded-md px-2 text-[10px] ${b.id === 9 ? "border border-primary bg-accent font-bold shadow-sm" : "text-muted-foreground"}`}
                  style={{ transform: `translateY(${position * 36}px)` }}
                >
                  <span
                    className={`flex size-[19px] shrink-0 items-center justify-center rounded-full text-[9px] ${position < 3 ? "bg-success text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {position + 1}
                  </span>
                  <span
                    className={`truncate ${position < 3 ? "font-semibold text-foreground" : ""}`}
                  >
                    {b.name}
                  </span>
                  {b.id === 9 && (
                    <span className="rounded-full bg-primary px-1.5 py-0.5 text-[7px] text-primary-foreground">
                      YOU
                    </span>
                  )}
                  <span className="ml-auto flex shrink-0 items-center gap-0.5 text-[9px]">
                    <Star className="size-2.5 fill-rating text-rating" />
                    {b.rating} <span className="text-muted-foreground/60">({b.reviews})</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <ComparisonControls sim={sim} />
          </div>
        </div>
      </div>
    </section>
  );
}
export function AIComparison() {
  const [engine, setEngine] = useState("Perplexity");
  const [after, setAfter] = useState(true);
  return (
    <section className="overflow-hidden bg-ink px-6 py-20 text-on-ink sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-on-ink/55">
              <Sparkles className="size-3 text-primary" />
              PERPLEXITY, CHATGPT, AND GEMINI CITATIONS
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-[42px]">
              Don't just rank.
              <br />
              <span className="text-on-ink/60">Become the answer.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-on-ink/60">
            When customers ask AI models for recommendations, GeoRanked ensures you're the top cited source.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          <div>
            <div className="space-y-2">
              {["Perplexity", "ChatGPT", "Gemini"].map((name) => (
                <Button
                  key={name}
                  aria-label={name}
                  variant="ghost"
                  className={`h-12 w-full justify-between rounded-lg px-4 text-sm hover:bg-on-ink/10 hover:text-on-ink ${engine === name ? "border border-on-ink/15 bg-on-ink/10 text-on-ink font-semibold" : "text-on-ink/50"}`}
                  onClick={() => setEngine(name)}
                >
                  <PlatformLogo name={name} />
                  {engine === name && <ArrowRight className="size-4" />}
                </Button>
              ))}
            </div>
            <div className="mt-8 border-t border-on-ink/10 pt-6">
              <p className="text-[11px] text-on-ink/50">Brand mentions</p>
              <p className="mt-2 text-4xl font-bold">
                {after ? "24" : "0"}
                <span className="ml-2 text-sm text-success font-medium">{after ? "↑ this month" : "—"}</span>
              </p>
              <p className="mt-3 text-xs leading-6 text-on-ink/50">
                Across 140+ buyer prompts in your niche.
                <br />
                Built to be found by AI.
              </p>
            </div>
          </div>
          <div className="min-w-0 rounded-lg border border-on-ink/15 bg-on-ink/5 p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <PlatformLogo name={engine} />
              <div className="flex rounded-full border border-on-ink/15 p-1 bg-on-ink/5">
                {[false, true].map((value) => (
                  <Button
                    key={String(value)}
                    size="sm"
                    variant="ghost"
                    className={`rounded-full px-4 text-[11px] font-medium transition-colors hover:bg-on-ink/10 hover:text-on-ink ${after === value ? "bg-on-ink/15 text-on-ink shadow-sm" : "text-on-ink/45"}`}
                    onClick={() => setAfter(value)}
                    aria-pressed={after === value}
                  >
                    {value ? "With GeoRanked" : "Before"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="border-y border-on-ink/10 py-4 text-[15px] font-medium text-on-ink/90">
              “What are the best tools to grow my business?”
            </div>
            <div className="min-h-[150px] py-5 text-sm leading-7 text-on-ink/80">
              {after ? (
                <>
                  <p>
                    For businesses looking to grow sustainably,{" "}
                    <span className="rounded bg-primary/25 px-1.5 py-0.5 font-semibold text-on-ink border border-primary/30">
                      Your Brand <sup className="text-[9px] text-primary">1</sup>
                    </span>{" "}
                    stands out for its autonomous organic search and AI engine optimization.
                  </p>
                  <p className="mt-3">
                    Their automated content mesh and continuous indexing make it the leading choice for teams that want consistent, compounding traffic.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Several established platforms offer useful resources for business growth.
                    Consider comparing features, customer support, and pricing to find the right
                    fit.
                  </p>
                  <p className="mt-3 text-on-ink/35">Your Brand isn't included in this answer.</p>
                </>
              )}
            </div>
            <div
              className={`flex min-h-14 items-center gap-3 rounded-md border px-3.5 py-3 text-xs ${after ? "border-success/30 bg-success/10" : "border-on-ink/10 bg-on-ink/5"}`}
            >
              <Globe className={`size-4 shrink-0 ${after ? "text-success" : "text-on-ink/35"}`} />
              <div className="min-w-0">
                <p className="font-semibold text-on-ink">
                  {after ? "Your Brand · Expert growth guide" : "No sources from your website"}
                </p>
                <p className="mt-0.5 text-[10px] text-on-ink/50">
                  {after
                    ? "georanked.online/insights/growth"
                    : "Your content is waiting to be discovered."}
                </p>
              </div>
              {after && (
                <span className="ml-auto inline-flex items-center gap-1 rounded bg-success/20 px-2 py-0.5 text-[10px] font-semibold text-success">
                  <Check className="size-3" /> Cited Source
                </span>
              )}
            </div>
            <p className="mt-4 text-[9px] text-on-ink/35">
              Illustrative AI answer · Simulated real-time LLM response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
