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
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        label="Simple pricing. Serious growth."
        title="An unfair advantage. A fair price."
        description="No agency fees. No long-term contracts. Just consistent growth."
      />
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {[
          {
            name: "Starter",
            price: 39,
            desc: "Plant the seeds for organic growth.",
            features: [
              "10 articles per month",
              "AI keyword research",
              "Automatic CMS publishing",
              "SEO-optimized images",
              "1 website",
            ],
          },
          {
            name: "Growth GEO",
            price: 79,
            desc: "Own the conversation. Everywhere.",
            features: [
              "30 articles per month",
              "Everything in Starter",
              "Perplexity & ChatGPT citations",
              "Smart internal linking mesh",
              "Priority content generation",
            ],
          },
          {
            name: "Scale Agency",
            price: 149,
            desc: "More sites. More reach. Less work.",
            features: [
              "60 articles per month",
              "Everything in Growth GEO",
              "5 websites",
              "Telegram 1-click approval",
              "Agency-ready workflows",
            ],
          },
        ].map((p, i) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-lg border bg-card p-7 transition-transform hover:-translate-y-1 ${i === 1 ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}
          >
            {i === 1 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-semibold text-primary-foreground">
                ✦ Most popular
              </span>
            )}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="my-7">
              <strong className="text-4xl">${p.price}</strong>
              <span className="text-sm text-muted-foreground"> / month</span>
            </div>
            <Button
              variant={i === 1 ? "default" : "outline"}
              className={i === 1 ? "glow-button" : ""}
              asChild
            >
              <Link to="/dashboard">
                Get started <ArrowRight />
              </Link>
            </Button>
            <ul className="mt-7 space-y-4">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Explore the live demo before choosing a plan. No credit card required.
      </p>
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
            "How does Overrank work?",
            "Connect your website, choose your topics, and let Overrank discover keywords, create optimized articles, and publish to your CMS. The live dashboard is a simulation you can explore without connecting a real site.",
          ],
          [
            "What is GEO, and why does it matter?",
            "Generative Engine Optimization helps your content become a source for AI answers in tools like ChatGPT, Perplexity, and Gemini, alongside traditional Google search rankings.",
          ],
          [
            "Can I review articles before they go live?",
            "Yes. Articles can be held as drafts or scheduled for review before publishing. The Scale Agency plan also includes Telegram 1-click approval.",
          ],
          [
            "Which platforms can I connect?",
            "WordPress, Shopify, and Webflow are featured in our setup experience. This demo simulates connecting a CMS; it does not submit credentials or publish to a live website.",
          ],
          [
            "Does it guarantee rankings or AI citations?",
            "No platform can guarantee rankings or citations. The search previews, growth metrics, and graphs shown here are illustrative demo data.",
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
