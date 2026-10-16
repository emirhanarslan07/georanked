import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Check,
  FileCode,
  FolderDown,
  Layers,
  Shield,
  Zap,
  Copy,
  CheckCircle2,
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

export const Route = createFileRoute("/vault-ai")({
  head: () => ({
    meta: [
      { title: "VaultAI — Auto-Sync ChatGPT, Claude & Grok to Obsidian & Markdown" },
      {
        name: "description",
        content:
          "Save your AI brilliance. Automatically export ChatGPT, Claude & Grok chats with clean YAML metadata into your local Obsidian vault.",
      },
      { property: "og:title", content: "VaultAI — Zero Cloud Storage AI Chat Exporter" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: VaultAIPage,
});

const sampleMarkdown = `---
title: "Next.js Autonomous Agent Architecture"
date: 2026-10-16
model: Claude 3.7 Sonnet
tags: [ai, architecture, nextjs, pkm]
source: claude.ai/chat/c9842a
---

# Architecture Overview

1. **State Isolation**: Independent workspace sandboxes
2. **Deterministic Triage**: Ring 1 incoming dispatch
3. **Local Markdown Sync**: Auto-persisted to \`vault/engineering/\`

\`\`\`typescript
export function exportVault(chatId: string): MarkdownFile {
  return formatFrontmatter(chatId, { exportTags: true });
}
\`\`\`
`;

function VaultAIPage() {
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [appChoice, setAppChoice] = useState("Obsidian");

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              2026 VERIFIED MODEL: $413/MO POLAR VALIDATED
            </div>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.1] sm:text-[60px]">
              Never lose an AI breakthrough.
              <br />
              <span className="brand-gradient">Direct to your Obsidian vault.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-muted-foreground">
              Automatically sync ChatGPT, Claude and Grok conversations, code blocks, and project files
              into clean, formatted Markdown notes with YAML frontmatter. 100% private, zero cloud storage.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => setDialogOpen(true)}
                className="glow-button h-12 rounded-full px-7 font-medium"
              >
                Join Early Access ($19 Lifetime) <ArrowRight className="ml-1.5 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCopy}
                className="h-12 rounded-full bg-background/80 px-6 font-medium shadow-sm hover:bg-background"
              >
                {copied ? <Check className="mr-2 size-4 text-emerald-500" /> : <Copy className="mr-2 size-4" />}
                {copied ? "Copied Sample .md!" : "Copy Sample Markdown"}
              </Button>
            </div>
          </div>

          {/* Interactive Live Markdown Preview Card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border/80 bg-card/90 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2.5">
                <FileCode className="size-5 text-primary" />
                <span className="text-sm font-semibold">Live Markdown Output Preview</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                  Obsidian & Notion Ready
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={handleCopy} className="text-xs">
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="mt-4 max-h-[280px] overflow-x-auto rounded-xl bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground/90">
              {sampleMarkdown}
            </pre>
          </div>

          {/* Value Highlights */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">100% Local Privacy</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Your research and code never touch third-party servers. Synced directly from your browser to your local vault.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Layers className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">Multi-Model Support</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Works seamlessly across ChatGPT (GPT-4o), Claude 3.7, and xAI Grok. Tagged and indexed automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">YAML Frontmatter</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Obsidian Dataview compliant. Filter and query your AI brainstorms by date, topic, or model effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get VaultAI Early Access</DialogTitle>
            <DialogDescription>
              We are onboarding 50 early builders with lifetime updates for $19 (one-time).
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
              <h4 className="mt-3 font-semibold">You're on the priority list!</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                We'll email your invite and early build link within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-foreground">Your Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Primary Note App</label>
                <select
                  value={appChoice}
                  onChange={(e) => setAppChoice(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Obsidian">Obsidian</option>
                  <option value="Notion">Notion</option>
                  <option value="Logseq">Logseq</option>
                  <option value="Local Markdown">Local Markdown Files</option>
                </select>
              </div>
              <Button type="submit" className="glow-button w-full">
                Claim Early Access Slot ($19)
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </MarketingShell>
  );
}
