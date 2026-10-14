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
  const [engine, setEngine] = useState("Google");
  const [query, setQuery] = useState("best tools for growing my business");
  const [submitted, setSubmitted] = useState(query);
  return (
    <div ref={sim.ref} className="relative mx-auto mt-8 max-w-[690px]">
      <div className="mb-4 flex justify-center gap-2">
        {["Google", "Perplexity"].map((e) => (
          <Button
            key={e}
            variant={engine === e ? "secondary" : "ghost"}
            size="sm"
            className="rounded-full border border-transparent px-4 text-xs"
            onClick={() => setEngine(e)}
            aria-pressed={engine === e}
          >
            <PlatformLogo name={e} iconOnly />
            {e === "Google" ? "Google Search" : "Perplexity AI"}
          </Button>
        ))}
      </div>
      <div className="search-demo overflow-hidden rounded-lg border border-border bg-background text-left">
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
          <span className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
            <span className="live-dot size-1.5 rounded-full bg-success" />
            YOUR NEXT CUSTOMER'S SEARCH
          </span>
          <span className="text-[9px] text-muted-foreground">Live simulation</span>
        </div>
        <div className="p-4 sm:p-5">
          <form
            className="flex h-11 items-center gap-3 rounded-full border border-border bg-muted/60 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(query.trim() || "best tools for growing my business");
              sim.replay();
            }}
          >
            <PlatformLogo name={engine} iconOnly />
            <input
              aria-label="Search preview query"
              className="min-w-0 flex-1 bg-transparent text-xs outline-none sm:text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" aria-label="Search">
              <Search />
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {engine === "Google" ? "Organic search results" : "AI answer sources"}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${sim.rank <= 3 ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`}
            >
              {engine === "Google"
                ? `#${sim.rank} on Google`
                : sim.rank <= 3
                  ? "Cited in AI answer"
                  : "Not cited yet"}
            </span>
          </div>
          <div
            className={`my-3 rounded-lg border p-4 transition-all duration-500 ${sim.rank <= 3 ? "border-primary/40 bg-accent/25 ring-4 ring-primary/5" : "border-border bg-muted/20"}`}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-accent text-primary">
                <Globe className="size-4" />
              </span>
              <div className="text-xs">
                <strong>Your Brand</strong>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  georanked.online › insights › growth
                </p>
              </div>
              <span className="ml-auto rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                YOU
              </span>
            </div>
            <h3 className="mt-3 text-[16px] font-semibold text-brand-blue">
              Why Your Brand is a leading choice
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Businesses using this automated system experience 3x increase in organic leads within 90 days. Top-rated customer satisfaction.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded bg-success-soft px-2.5 py-1 text-[10px] font-medium text-success">
                {sim.rank <= 3 ? "+2,400 monthly clicks" : "120 monthly clicks"}
              </span>
              <span className="rounded bg-accent px-2.5 py-1 text-[10px] font-medium text-primary">
                {sim.rank <= 3
                  ? engine === "Google"
                    ? "Featured snippet"
                    : "Perplexity citation"
                  : "Waiting to be discovered"}
              </span>
              {sim.rank <= 3 && (
                <span className="rounded bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  + 3 more winning stories
                </span>
              )}
            </div>
          </div>
          <ComparisonControls sim={sim} />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        Illustrative results. Real ambition. No rankings or citations guaranteed.
      </p>
    </div>
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
