import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Globe } from "lucide-react";

interface Props {
  planName: string;
  onClose: () => void;
}

export function EarlyAccessModal({ planName, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState<"AI Search Citations" | "Google Organic Traffic" | "Full Content Autopilot">(
    "AI Search Citations"
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !website) return;

    const lead = {
      name: name.trim() || "Visitor",
      email: email.trim(),
      website: website.trim(),
      goal,
      plan: planName,
      date: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("georanked_leads") || "[]");
      existing.push(lead);
      localStorage.setItem("georanked_leads", JSON.stringify(existing));
    } catch (err) {}

    try {
      (window as any).va?.("event", { name: "lead_captured", data: lead });
    } catch (e) {}

    try {
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "package_form", ...lead }),
      }).catch(() => {});
    } catch (e) {}

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 sm:p-8 shadow-2xl overflow-hidden text-foreground">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 size-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 size-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs">
                G
              </span>
              <span className="text-sm font-bold tracking-tight">GeoRanked Early Access</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Claim Your Early Adopter Spot
            </h3>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1">
                Selected: {planName}
              </span>
              <span className="text-[11px] font-semibold text-primary flex items-center gap-1">
                <Sparkles className="size-3" /> 20% Lifetime Discount Locked
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1.5">Work Email (Required)</label>
                <input
                  type="email"
                  required
                  placeholder="alex@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1.5">Target Website / Product URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="https://yourbrand.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1.5">Primary Growth Objective</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(["AI Search Citations", "Google Organic Traffic", "Full Content Autopilot"] as const).map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`py-2 px-2 rounded-lg border text-[11px] font-medium text-center transition-all ${
                        goal === g
                          ? "border-primary bg-accent text-primary font-bold shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-lg bg-primary py-3 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Activate Early Access & Audit</span>
                <ArrowRight className="size-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-2">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>No credit card required. Onboarding in cohorts to ensure high-ranking quality.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
              <CheckCircle2 className="size-8" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              Spot Reserved!
            </h3>

            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              We've placed your site <strong className="text-foreground">{website}</strong> in Cohort #1 for the{" "}
              <strong className="text-primary">{planName}</strong> plan.
            </p>

            <div className="rounded-lg border border-primary/20 bg-accent/50 p-4 text-xs font-medium">
              We'll send your automated AI Citation & Keyword Audit to:
              <div className="font-bold text-foreground mt-1 text-sm">{email}</div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-xs font-semibold hover:opacity-95 transition-opacity"
            >
              Back to GeoRanked
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
