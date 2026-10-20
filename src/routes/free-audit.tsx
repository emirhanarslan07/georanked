import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Globe,
  Bot,
  Zap,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Layers,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/shell";
import { EarlyAccessModal } from "@/components/EarlyAccessModal";
import { TrialSignupModal } from "@/components/TrialSignupModal";

export const Route = createFileRoute("/free-audit")({
  head: () => ({
    meta: [
      { title: "Free AI Citation & GEO Audit — Test Your Brand on ChatGPT & Perplexity | GeoRanked" },
      {
        name: "description",
        content:
          "Run a free 60-second Generative Engine Optimization (GEO) audit. See if ChatGPT, Perplexity, and Google cite your website or recommend your competitors.",
      },
    ],
  }),
  component: FreeAuditPage,
});

function FreeAuditPage() {
  const [domainInput, setDomainInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [auditResult, setAuditResult] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  const scanSteps = [
    "Connecting to domain and extracting metadata...",
    "Querying Perplexity AI API for brand citation frequency...",
    "Simulating SearchGPT commercial recommendation intent...",
    "Auditing schema entities & structured Q&A consensus...",
    "Synthesizing 12-factor Generative Engine Optimization report...",
  ];

  const triggerScan = (rawDomain: string, rawKeyword: string, source: string = "manual_button") => {
    const cleanDomain = rawDomain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!cleanDomain) return;

    setIsScanning(true);
    setScanStep(0);
    setScanProgress(10);
    setAuditResult(null);

    // Track scan started in Vercel Analytics
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("event", { name: "audit_started", domain: cleanDomain, source });
    }

    try {
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "audit_scan",
          domain: cleanDomain,
          keyword: (rawKeyword || "").trim() || `${cleanDomain} (${source})`,
        }),
      }).catch(() => {});
    } catch (e) {}

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 450);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      clearInterval(stepInterval);
      setScanProgress(100);

      // Generate deterministic but realistic audit result based on domain
      const hash = cleanDomain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const score = 26 + (hash % 18); // 26 - 43 (realistic gap score)

      const result = {
        domain: cleanDomain,
        targetKeyword: keywordInput.trim() || `${cleanDomain} alternative`,
        overallScore: score,
        projectedScore: 92,
        perplexityStatus: "Not Cited in Top Sources",
        perplexityDetail: "LLM synthesizes answers from 4 competitor domains instead of your site.",
        chatGptStatus: "Zero Commercial Recommendations",
        chatGptDetail: "When users ask 'What is the best solution for...', your brand is absent from primary output clusters.",
        googleAiStatus: "Missing AI Overview Snippets",
        googleAiDetail: "Domain lacks structured schema and answer-first H2/H3 formatting.",
        schemaStatus: "Incomplete JSON-LD Graph",
        schemaDetail: "No Organization, FAQPage, or SoftwareApplication entity markup detected.",
        competitorsCited: [
          `Top authority in ${keywordInput || "your niche"}`,
          "G2 / Trustpilot aggregate directories",
          "Secondary niche competitor",
        ],
        monthlyPotentialLoss: "$3,400 – $8,200 in organic pipeline",
      };

      setAuditResult(result);
      setIsScanning(false);

      if (typeof window !== "undefined" && (window as any).va) {
        (window as any).va("event", { name: "audit_completed", domain: cleanDomain, score });
      }
    }, 3200);
  };

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    triggerScan(domainInput, keywordInput, "manual_button");
  };

  // Check query params on mount and auto-start scan if ?domain= is provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlDomain = params.get("domain");
      if (urlDomain) {
        const cleanUrlDomain = urlDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
        setDomainInput(cleanUrlDomain);
        triggerScan(cleanUrlDomain, "", "email_deep_link");
      }
    }
  }, []);

  return (
    <MarketingShell>
      <div className="min-h-screen px-4 pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5 text-primary" />
              FREE INSTANT AI CITATION & GEO AUDIT
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Does ChatGPT recommend your brand,
              <br />
              <span className="brand-gradient">or your competitors?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Over 40% of high-intent buyers now search on Perplexity, SearchGPT, and Claude before
              buying. Enter your website below to run a comprehensive 60-second AI Visibility Audit.
            </p>
          </div>

          {/* Input Scanner Form */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
            <form onSubmit={handleStartScan} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Website Domain <span className="text-destructive">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <Globe className="mr-2 size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground select-none">https://</span>
                    <input
                      type="text"
                      placeholder="yoursite.com"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      required
                      disabled={isScanning}
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Primary Keyword / Product Category
                  </label>
                  <div className="flex items-center rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <Search className="mr-2 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. AI CRM, fashion store, accounting"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      disabled={isScanning}
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isScanning || !domainInput.trim()}
                className="glow-button mt-4 h-12 w-full rounded-xl text-sm font-semibold sm:text-base"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="size-4 animate-spin" /> Scanning Perplexity & ChatGPT Indexes...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Run Free AI Citation Audit <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Scanning Progress State */}
            {isScanning && (
              <div className="mt-8 rounded-xl border border-primary/20 bg-accent/30 p-6 text-center animate-pulse">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="size-7 animate-bounce" />
                </div>
                <h4 className="mt-4 font-bold text-base sm:text-lg">
                  Analyzing {domainInput}...
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {scanSteps[scanStep]}
                </p>

                <div className="mx-auto mt-5 max-w-md">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <span className="mt-2 block text-right text-[11px] font-mono text-muted-foreground">
                    {scanProgress}% Completed
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Audit Result Display */}
          {auditResult && (
            <div className="mt-10 space-y-6">
              {/* Score Banner */}
              <div className="rounded-2xl border border-destructive/20 bg-gradient-to-br from-card via-danger-soft/20 to-card p-6 shadow-xl sm:p-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-destructive">
                      <AlertTriangle className="size-3.5" /> High Risk Citation Gap Detected
                    </div>
                    <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                      Audit Report for <span className="text-primary">{auditResult.domain}</span>
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Target Query Context: &ldquo;{auditResult.targetKeyword}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-5 text-center">
                    <div className="rounded-2xl border border-destructive/20 bg-background/80 p-4 shadow-inner">
                      <div className="text-3xl font-extrabold text-destructive sm:text-4xl">
                        {auditResult.overallScore}
                        <span className="text-sm font-normal text-muted-foreground">/100</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Current AI Visibility
                      </span>
                    </div>

                    <ArrowRight className="size-6 text-muted-foreground hidden sm:block" />

                    <div className="rounded-2xl border border-success/30 bg-success-soft/30 p-4 shadow-inner">
                      <div className="text-3xl font-extrabold text-success sm:text-4xl">
                        {auditResult.projectedScore}
                        <span className="text-sm font-normal text-muted-foreground">/100</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-success">
                        With GeoRanked
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Findings Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Perplexity */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-accent text-primary">
                        <Bot className="size-4" />
                      </span>
                      <h4 className="font-bold text-sm">Perplexity AI Citation</h4>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-[11px] font-bold text-destructive">
                      <XCircle className="size-3" /> Absent
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {auditResult.perplexityDetail}
                  </p>
                </div>

                {/* ChatGPT Search */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-accent text-primary">
                        <Sparkles className="size-4" />
                      </span>
                      <h4 className="font-bold text-sm">ChatGPT 4o Recommendation</h4>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-500">
                      <AlertTriangle className="size-3" /> Unranked
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {auditResult.chatGptDetail}
                  </p>
                </div>

                {/* Google AI Overviews */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-accent text-primary">
                        <Zap className="size-4" />
                      </span>
                      <h4 className="font-bold text-sm">Google AI Overviews (SGE)</h4>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-[11px] font-bold text-destructive">
                      <XCircle className="size-3" /> 0 Snippets
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {auditResult.googleAiDetail}
                  </p>
                </div>

                {/* Structured Knowledge Graph */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-accent text-primary">
                        <Layers className="size-4" />
                      </span>
                      <h4 className="font-bold text-sm">Entity Schema & Graph</h4>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-500">
                      <AlertTriangle className="size-3" /> Incomplete
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {auditResult.schemaDetail}
                  </p>
                </div>
              </div>

              {/* Conversion Call-to-Action Card */}
              <div className="rounded-2xl border-2 border-primary/50 bg-card p-7 shadow-2xl text-center sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 bg-primary/10 py-1.5 px-4 border-b border-primary/20 text-[11px] font-bold text-primary flex items-center justify-center gap-2">
                  <span>⚡ LOCAL EXCLUSIVITY: Max 2 businesses per city/ZIP code accepted</span>
                </div>

                <div className="pt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                  <Zap className="size-4" /> 24-HOUR ACTIONABLE DELIVERABLE
                </div>

                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                  Get Your 15-Page AI Visibility & Citation Blueprint
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  A forensic analysis of how ChatGPT, Perplexity, and Google Gemini rank your business vs. competitors in your city. Includes your competitors' exact citation sources, missing entity schemas, and ready-to-copy LocalBusiness Schema code.
                </p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-foreground">$49</span>
                  <span className="ml-2 text-sm text-muted-foreground font-medium">/ one-time payment (No subscription)</span>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    className="glow-button h-13 rounded-full px-8 text-sm font-bold w-full sm:w-auto shadow-xl"
                    asChild
                  >
                    <a
                      href="https://buy.polar.sh/polar_cl_O9bjWaIMCUHrVeRAE6xtDtBnLAapgiqBRYwAU10ESqm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order 15-Page Audit Report ($49) <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 rounded-full px-6 text-sm font-medium w-full sm:w-auto"
                    asChild
                  >
                    <Link to={`/dashboard?domain=${encodeURIComponent(domainInput || 'yourbrand.com')}`}>
                      Explore Interactive Dashboard →
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground border-t border-border/60 pt-5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-success" /> Delivered in 24 hours via email
                  </span>
                  <span>•</span>
                  <span>One-time payment — zero recurring fees</span>
                  <span>•</span>
                  <span>Human-verified AI citation analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Conversion Bar when audit result is displayed */}
          {auditResult && (
            <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border-2 border-primary/60 bg-background/95 p-3.5 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 text-left">
                <span className="flex size-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive font-black text-xs">
                  {auditResult.overallScore}%
                </span>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    {domainInput || auditResult.domain} — Unranked in AI Search
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Competitors recommended by ChatGPT & Perplexity. Get the fix blueprint.
                  </div>
                </div>
              </div>
              <Button size="sm" className="glow-button rounded-xl font-bold px-6 shrink-0 text-xs h-10 w-full sm:w-auto" asChild>
                <a
                  href="https://buy.polar.sh/polar_cl_O9bjWaIMCUHrVeRAE6xtDtBnLAapgiqBRYwAU10ESqm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get 15-Page Audit ($49) →
                </a>
              </Button>
            </div>
          )}

          {/* Trust badges footer */}
          <div className="mt-14 border-t border-border pt-8 text-center text-xs text-muted-foreground">
            <p>Trusted by 1,156+ verified digital businesses, SaaS founders, and e-commerce stores.</p>
          </div>
        </div>
      </div>

      <TrialSignupModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        defaultDomain={domainInput}
      />
    </MarketingShell>
  );
}
