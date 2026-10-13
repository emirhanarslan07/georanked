import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Plug,
  Plus,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Check,
  Search,
  CalendarDays,
  List,
  Clock,
  MoreHorizontal,
  Globe,
  ExternalLink,
  Loader2,
  ArrowRight,
  Settings2,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Brand, PlatformLogo } from "@/components/brand";
import { TrafficChart } from "@/components/traffic-chart";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Live Dashboard — Overrank" },
      {
        name: "description",
        content:
          "Explore your autonomous SEO workspace. Traffic, AI citations, article generation, and CMS integrations in an interactive demo.",
      },
      { property: "og:title", content: "Overrank Live Dashboard" },
      {
        property: "og:description",
        content: "Explore your organic growth workspace and generate a demo article.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
type Article = {
  id: number;
  title: string;
  keyword: string;
  words: number;
  status: "Published" | "Scheduled" | "Draft";
  date: string;
};
const initial: Article[] = [
  {
    id: 1,
    title: "The complete guide to sustainable business growth",
    keyword: "sustainable business growth",
    words: 1840,
    status: "Published",
    date: "Oct 12",
  },
  {
    id: 2,
    title: "7 proven ways to improve your customer experience",
    keyword: "improve customer experience",
    words: 2150,
    status: "Published",
    date: "Oct 11",
  },
  {
    id: 3,
    title: "How to choose the right tools for your business",
    keyword: "best business tools",
    words: 1680,
    status: "Published",
    date: "Oct 10",
  },
  {
    id: 4,
    title: "Why AI search is the next big opportunity for brands",
    keyword: "AI search optimization",
    words: 2240,
    status: "Scheduled",
    date: "Oct 14",
  },
  {
    id: 5,
    title: "Building an organic growth strategy that lasts",
    keyword: "organic growth strategy",
    words: 1920,
    status: "Scheduled",
    date: "Oct 16",
  },
  {
    id: 6,
    title: "The small business guide to content marketing",
    keyword: "content marketing for small business",
    words: 1430,
    status: "Draft",
    date: "Oct 18",
  },
];
function Status({ status }: { status: Article["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status === "Published" ? "bg-success-soft text-success" : status === "Scheduled" ? "bg-accent text-primary" : "bg-muted text-muted-foreground"}`}
    >
      {status === "Published" ? (
        <Check className="size-3" />
      ) : status === "Scheduled" ? (
        <Clock className="size-3" />
      ) : (
        <FileText className="size-3" />
      )}
      {status}
    </span>
  );
}
function Dashboard() {
  const [tab, setTab] = useState("Overview");
  const [articles, setArticles] = useState(initial);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [stage, setStage] = useState(0);
  const [generated, setGenerated] = useState<Article | null>(null);
  const [filter, setFilter] = useState("All articles");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState<Article | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const [connectPlatform, setConnectPlatform] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [connectError, setConnectError] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (stage < 1 || stage > 3) return;
    const timer = setTimeout(() => {
      if (stage === 3) {
        const keyword = topic.trim() || "AI search optimization";
        const a: Article = {
          id: Date.now(),
          title: `The complete guide to ${keyword.toLowerCase()}`,
          keyword,
          words: 1864,
          status: "Draft",
          date: "Oct 13",
        };
        setArticles((old) => [a, ...old]);
        setGenerated(a);
      }
      setStage(stage + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [stage, topic]);
  const visible = articles.filter(
    (a) =>
      (filter === "All articles" || a.status === filter) &&
      `${a.title} ${a.keyword}`.toLowerCase().includes(search.toLowerCase()),
  );
  const openGenerator = () => {
    setTopic("");
    setStage(0);
    setGenerated(null);
    setGenerateOpen(true);
  };
  const navigateTab = (t: string) => {
    setTab(t);
    setMobileNav(false);
  };
  function connect(e: React.FormEvent) {
    e.preventDefault();
    try {
      const u = new URL(url);
      if (!["https:", "http:"].includes(u.protocol)) throw Error();
    } catch {
      setConnectError("Enter a valid website URL, such as https://yourbrand.com.");
      return;
    }
    if (apiKey.trim().length < 4) {
      setConnectError("Enter a demo API key with at least 4 characters.");
      return;
    }
    setConnectError("");
    setConnecting(true);
    setTimeout(() => {
      if (connectPlatform) {
        setConnections((v) => [...v, connectPlatform]);
        setToast(`${connectPlatform} demo connection is ready`);
      }
      setConnecting(false);
      setConnectPlatform(null);
      setApiKey("");
      setUrl("");
    }, 850);
  }
  return (
    <div className="min-h-screen bg-muted">
      <aside
        className={`${mobileNav ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 w-60 flex-col border-r border-border bg-background p-5 lg:flex`}
      >
        <div className="flex items-center justify-between">
          <Brand />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>
        <div className="mt-9 flex items-center gap-3 rounded-lg border border-border p-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-accent text-primary">
            <Globe className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold">Your Brand</p>
            <p className="mt-1 text-[10px] text-muted-foreground">yourbrand.com</p>
          </div>
          <ChevronDown className="ml-auto size-3 text-muted-foreground" />
        </div>
        <p className="mb-3 mt-7 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>
        <nav className="space-y-1">
          {[
            [LayoutDashboard, "Overview"],
            [FileText, "Articles & Calendar"],
            [Plug, "CMS Integrations"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof LayoutDashboard;
            return (
              <Button
                key={String(label)}
                variant="ghost"
                className={`h-11 w-full justify-start px-3 text-xs ${tab === label ? "bg-accent text-primary" : "text-muted-foreground"}`}
                onClick={() => navigateTab(String(label))}
              >
                <I className="size-4" />
                {String(label)}
                {label === "Articles & Calendar" && (
                  <span className="ml-auto text-[10px]">{articles.length}</span>
                )}
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto">
          <div className="rounded-lg border border-primary/15 bg-accent/60 p-4">
            <div className="flex justify-between text-xs font-semibold">
              <span>Growth GEO</span>
              <Sparkles className="size-4 text-primary" />
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">
              {articles.length} of 30 articles this month
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary/10">
              <div className="h-full w-1/4 rounded-full bg-primary" />
            </div>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-[11px]">
              <Link to="/pricing">
                Explore plans <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <Link to="/" className="mt-5 flex items-center gap-2 px-3 text-xs text-muted-foreground">
            <ArrowUpRight className="size-4" />
            Back to website
          </Link>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
            <span className="flex size-8 items-center justify-center rounded-full bg-ink text-xs text-on-ink">
              JD
            </span>
            <div className="text-xs font-semibold">
              Demo workspace
              <p className="mt-1 text-[10px] font-normal text-muted-foreground">
                No live data connected
              </p>
            </div>
          </div>
        </div>
      </aside>
      <div className="lg:ml-60">
        <header className="flex h-[76px] items-center justify-between border-b border-border bg-background px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Open workspace navigation"
            >
              <Menu />
            </Button>
            <span className="text-sm text-muted-foreground">
              Workspace <span className="mx-2 text-border">/</span>
              <strong className="font-medium text-foreground">{tab}</strong>
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-primary/15 bg-accent px-2.5 py-1 text-[10px] font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Live demo
          </span>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {tab === "Overview"
                  ? "Your growth, at a glance."
                  : tab === "Articles & Calendar"
                    ? "Content that works for you."
                    : "Your website. Connected."}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {tab === "Overview"
                  ? "Welcome back. Your organic growth is on the right track."
                  : tab === "Articles & Calendar"
                    ? "Every article is another opportunity to get discovered."
                    : "One connection. A whole new growth engine."}
              </p>
            </div>
            <Button onClick={openGenerator} className="glow-button">
              <Plus />
              Generate article now
            </Button>
          </div>
          {tab === "Overview" && (
            <>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [TrendingUp, "Organic clicks", "24,892", "+184.6%"],
                  [
                    FileText,
                    "Articles published",
                    String(articles.filter((a) => a.status === "Published").length),
                    "This month",
                  ],
                  [Sparkles, "AI citation rate", "32.8%", "+12.4%"],
                  [Search, "Keywords ranking", "148", "+42 keywords"],
                ].map(([Icon, label, value, change]) => {
                  const I = Icon as typeof TrendingUp;
                  return (
                    <div
                      key={String(label)}
                      className="rounded-lg border border-border bg-card p-5"
                    >
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {String(label)}
                        <I className="size-4" />
                      </div>
                      <div className="mt-4 text-3xl font-bold">{String(value)}</div>
                      <div className="mt-2 text-[11px] text-success">
                        {String(change)}{" "}
                        <span className="ml-1 text-muted-foreground">
                          {label === "Articles published" ? "" : "vs. last period"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-6 xl:grid-cols-[1fr_290px]">
                <TrafficChart compact />
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="text-sm font-semibold">AI search visibility</h2>
                  <p className="mt-1 text-xs text-muted-foreground">You're becoming the answer.</p>
                  <div className="mt-8 space-y-6">
                    {[
                      ["ChatGPT", 24, 72],
                      ["Perplexity", 18, 55],
                      ["Gemini", 12, 36],
                    ].map(([name, count, width]) => (
                      <div key={name}>
                        <div className="flex justify-between text-xs">
                          <PlatformLogo name={String(name)} />
                          <span className="text-muted-foreground">{count} citations</span>
                        </div>
                        <div className="mt-3 flex h-1.5 rounded-full bg-muted">
                          <span
                            className={`rounded-full bg-primary ${width === 72 ? "w-3/4" : width === 55 ? "w-1/2" : "w-1/3"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex items-center gap-2 rounded-md bg-success-soft p-3 text-[11px] text-success">
                    <TrendingUp className="size-4" />
                    Visibility up 12.4% this month
                  </div>
                </div>
              </div>
              <section className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border p-5">
                  <h2 className="text-sm font-semibold">Recent articles</h2>
                  <Button variant="ghost" size="sm" onClick={() => setTab("Articles & Calendar")}>
                    View all <ArrowRight />
                  </Button>
                </div>
                {articles.slice(0, 4).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-4 last:border-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="hidden rounded-md bg-muted p-2 sm:block">
                        <FileText className="size-4 text-muted-foreground" />
                      </span>
                      <div className="min-w-0">
                        <Button
                          variant="link"
                          className="h-auto max-w-full justify-start whitespace-normal p-0 text-left text-xs text-foreground"
                          onClick={() => setSelected(a)}
                        >
                          {a.title}
                        </Button>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {a.words.toLocaleString()} words · {a.date}
                        </p>
                      </div>
                    </div>
                    <Status status={a.status} />
                  </div>
                ))}
              </section>
            </>
          )}
          {tab === "Articles & Calendar" && (
            <>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      className="h-9 w-40 bg-transparent text-xs outline-none"
                      placeholder="Search articles…"
                      aria-label="Search articles"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <select
                    className="rounded-md border border-border bg-background px-3 text-xs"
                    aria-label="Article status"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    {["All articles", "Published", "Scheduled", "Draft"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex rounded-md border border-border bg-background p-1">
                  <Button
                    size="sm"
                    variant={view === "list" ? "secondary" : "ghost"}
                    onClick={() => setView("list")}
                  >
                    <List />
                    List
                  </Button>
                  <Button
                    size="sm"
                    variant={view === "calendar" ? "secondary" : "ghost"}
                    onClick={() => setView("calendar")}
                  >
                    <CalendarDays />
                    Calendar
                  </Button>
                </div>
              </div>
              {view === "list" ? (
                <div className="overflow-x-auto rounded-lg border border-border bg-card">
                  <table className="w-full min-w-[680px] text-left text-xs">
                    <thead className="border-b border-border bg-muted/50 text-muted-foreground">
                      <tr>
                        {["Article", "Status", "Word count", "Date", ""].map((h, i) => (
                          <th key={i} className="px-5 py-4 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((a) => (
                        <tr key={a.id} className="border-b border-border last:border-0">
                          <td className="max-w-sm px-5 py-5">
                            <Button
                              variant="link"
                              className="h-auto whitespace-normal p-0 text-left text-xs font-semibold text-foreground"
                              onClick={() => setSelected(a)}
                            >
                              {a.title}
                            </Button>
                            <p className="mt-1.5 text-[10px] text-muted-foreground">{a.keyword}</p>
                          </td>
                          <td className="px-5">
                            <Status status={a.status} />
                          </td>
                          <td className="px-5 text-muted-foreground">{a.words.toLocaleString()}</td>
                          <td className="px-5 text-muted-foreground">{a.date}, 2026</td>
                          <td className="px-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`View ${a.title}`}
                              onClick={() => setSelected(a)}
                            >
                              <ArrowUpRight />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {visible.length === 0 && (
                    <p className="p-10 text-center text-sm text-muted-foreground">
                      No articles match your search.
                    </p>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between p-5">
                    <h2 className="font-semibold">October 2026</h2>
                    <span className="text-xs text-muted-foreground">{visible.length} articles</span>
                  </div>
                  <div className="grid min-w-[650px] grid-cols-7 border-t border-border">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <div
                        key={d}
                        className="border-b border-border bg-muted p-3 text-center text-xs text-muted-foreground"
                      >
                        {d}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2;
                      return (
                        <div
                          key={i}
                          className={`min-h-28 border-b border-r border-border p-2 ${day === 13 ? "bg-accent/40" : ""}`}
                        >
                          <span className="text-[11px] text-muted-foreground">
                            {day > 0 && day <= 31 ? day : ""}
                          </span>
                          {visible
                            .filter((a) => Number(a.date.split(" ")[1]) === day && day > 0)
                            .map((a) => (
                              <Button
                                key={a.id}
                                variant="ghost"
                                className="mt-2 h-auto w-full justify-start whitespace-normal bg-accent p-2 text-left text-[9px] text-primary"
                                onClick={() => setSelected(a)}
                              >
                                {a.title}
                              </Button>
                            ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
          {tab === "CMS Integrations" && (
            <>
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/15 bg-accent/50 p-4 text-xs text-muted-foreground">
                <Sparkles className="size-4 shrink-0 text-primary" />
                Demo setup only. Use placeholder credentials — no keys are sent or saved, and
                nothing is published.
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {["WordPress", "Shopify", "Webflow"].map((name) => (
                  <div
                    key={name}
                    className="flex flex-col rounded-lg border border-border bg-card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <PlatformLogo name={name} />
                      <span
                        className={`size-2 rounded-full ${connections.includes(name) ? "bg-success" : "bg-border"}`}
                      />
                    </div>
                    <p className="my-5 text-sm leading-6 text-muted-foreground">
                      {name === "WordPress"
                        ? "Turn your WordPress blog into an always-on growth engine."
                        : name === "Shopify"
                          ? "Bring new customers to your store with expert content."
                          : "Publish search-ready articles directly to your Webflow CMS."}
                    </p>
                    <div className="mb-6 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Check className="size-3 text-success" />
                      Articles, images & metadata
                    </div>
                    {connections.includes(name) ? (
                      <>
                        <span className="mb-3 text-xs text-success">✓ Connected in demo</span>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setConnections((c) => c.filter((n) => n !== name));
                            setToast(`${name} disconnected`);
                          }}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="mt-auto"
                        onClick={() => {
                          setConnectPlatform(name);
                          setUrl("");
                          setApiKey("");
                          setConnectError("");
                        }}
                      >
                        <Plug />
                        Connect {name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      {toast && (
        <div
          role="status"
          className="soft-shadow fixed bottom-6 right-6 z-50 flex max-w-[calc(100vw-48px)] items-center gap-2 rounded-lg border border-success/20 bg-background p-4 text-sm"
        >
          <Check className="size-4 text-success" />
          {toast}
        </div>
      )}
      <Dialog
        open={generateOpen}
        onOpenChange={(open) => {
          if (stage > 0 && stage < 4) return;
          setGenerateOpen(open);
        }}
      >
        <DialogContent className="max-w-[calc(100vw-32px)] sm:max-w-lg">
          <DialogHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
              <Sparkles className="size-5" />
            </div>
            <DialogTitle>
              {stage === 4
                ? "Your next article is ready."
                : "Let’s create something worth finding."}
            </DialogTitle>
            <DialogDescription>
              {stage === 4
                ? "A new demo draft has been added to your articles."
                : "Simulated AI generation. Give us a topic, and we’ll take it from here."}
            </DialogDescription>
          </DialogHeader>
          {stage === 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStage(1);
              }}
            >
              <label htmlFor="topic" className="text-xs font-semibold">
                Topic or target keyword
              </label>
              <input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. sustainable business growth"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                maxLength={100}
              />
              <p className="mt-2 text-[11px] text-muted-foreground">
                Leave blank to discover a topic for your brand.
              </p>
              <div className="my-5 flex gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground">
                <Search className="size-4 shrink-0" />
                Keyword research · Expert writing · SEO optimization
              </div>
              <Button type="submit" className="w-full">
                <Sparkles />
                Generate article
              </Button>
            </form>
          ) : stage < 4 ? (
            <div className="space-y-5 py-5">
              {[
                "Discovering high-opportunity keywords",
                "Writing your answer-first article",
                "Optimizing content and metadata",
              ].map((s, i) => (
                <div
                  key={s}
                  className={`flex items-center gap-3 text-sm ${stage > i ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {stage > i + 1 ? (
                    <Check className="size-5 text-success" />
                  ) : stage === i + 1 ? (
                    <Loader2 className="size-5 animate-spin text-primary" />
                  ) : (
                    <span className="size-5 rounded-full border border-border" />
                  )}
                  {s}
                </div>
              ))}
            </div>
          ) : (
            generated && (
              <div>
                <div className="my-4 rounded-lg border border-border p-4">
                  <Status status="Draft" />
                  <h3 className="mt-3 font-semibold">{generated.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {generated.words.toLocaleString()} words · {generated.keyword}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setGenerateOpen(false);
                    setTab("Articles & Calendar");
                    setSelected(generated);
                  }}
                >
                  View article <ArrowRight />
                </Button>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!connectPlatform}
        onOpenChange={(o) => {
          if (!o && !connecting) {
            setConnectPlatform(null);
            setApiKey("");
          }
        }}
      >
        <DialogContent className="max-w-[calc(100vw-32px)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Connect {connectPlatform}</DialogTitle>
            <DialogDescription>
              Try the setup with placeholder credentials. This connection is simulated.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={connect} className="space-y-4">
            <div>
              <label htmlFor="cms-url" className="text-xs font-semibold">
                Website URL
              </label>
              <input
                id="cms-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="mt-2 h-10 w-full rounded-md border border-input px-3 text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="cms-key" className="text-xs font-semibold">
                Demo API key
              </label>
              <input
                id="cms-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter a placeholder API key"
                className="mt-2 h-10 w-full rounded-md border border-input px-3 text-sm"
                required
                autoComplete="off"
              />
            </div>
            {connectError && (
              <p role="alert" className="text-xs text-destructive">
                {connectError}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={connecting}>
              {connecting ? <Loader2 className="animate-spin" /> : <Plug />}
              {connecting ? "Connecting…" : "Connect demo site"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-[calc(100vw-32px)] overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="mb-3">
                  <Status status={selected.status} />
                </div>
                <DialogTitle className="text-xl leading-normal">{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.words.toLocaleString()} words · Target keyword: {selected.keyword} ·{" "}
                  {selected.date}, 2026
                </DialogDescription>
              </DialogHeader>
              <article className="space-y-4 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
                <p className="rounded-md bg-accent p-3 text-xs text-primary">
                  Demo article preview · Content generation and publishing are simulated.
                </p>
                <h2 className="text-lg font-semibold text-foreground">
                  A smarter approach to {selected.keyword}
                </h2>
                <p>
                  Long-term growth starts with understanding what your customers need. A clear
                  strategy, consistent execution, and a focus on delivering value can help your
                  business turn new opportunities into meaningful progress.
                </p>
                <h3 className="font-semibold text-foreground">Start with your customers</h3>
                <p>
                  Identify the questions your audience asks most often. Build useful resources that
                  answer those questions directly, drawing on your experience and practical
                  examples.
                </p>
                <h3 className="font-semibold text-foreground">Create a repeatable strategy</h3>
                <p>
                  Choose a small set of measurable goals. Review your results regularly, improve
                  what works, and keep your content useful and up to date.
                </p>
              </article>
              {selected.status === "Draft" && (
                <Button
                  onClick={() => {
                    setArticles((arr) =>
                      arr.map((a) =>
                        a.id === selected.id ? { ...a, status: "Scheduled", date: "Oct 14" } : a,
                      ),
                    );
                    setSelected({ ...selected, status: "Scheduled", date: "Oct 14" });
                    setToast("Article scheduled for October 14 in demo");
                  }}
                >
                  <CalendarDays />
                  Schedule for Oct 14
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
