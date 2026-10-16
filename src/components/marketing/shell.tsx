import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
const nav = [
  { to: "/how-it-works", name: "How it works" },
  { to: "/vault-ai", name: "VaultAI" },
  { to: "/lead-reply", name: "LeadReply" },
  { to: "/sitepeel", name: "Sitepeel" },
  { to: "/formpulse", name: "FormPulse" },
  { to: "/pricing", name: "Pricing" },
] as const;
export function MarketingShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-30 px-4">
        <div className="soft-shadow mx-auto flex h-[68px] max-w-[1160px] items-center justify-between rounded-full border border-border/80 bg-background/85 px-3 backdrop-blur-xl sm:px-7">
          <Brand />
          <nav className="hidden gap-7 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-primary" }}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {n.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden text-xs lg:inline-flex">
              <Link to="/dashboard">Live demo</Link>
            </Button>
            <Button asChild className="glow-button rounded-full px-3 text-xs sm:px-5">
              <Link to="/dashboard">
                Get started <ArrowUpRight />
              </Link>
            </Button>
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              aria-label="Open navigation"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </Button>
          </div>
        </div>
        {open && (
          <nav className="soft-shadow mx-auto mt-2 flex max-w-lg flex-col rounded-lg border border-border bg-background p-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="p-3 text-sm">
                {n.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-background px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <Brand />
            <p className="mt-1 text-xs text-muted-foreground">
              Autonomous SEO & Generative Engine Optimization for modern brands.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">GeoRanked</Link>
            <Link to="/vault-ai" className="hover:text-primary transition-colors">VaultAI</Link>
            <Link to="/lead-reply" className="hover:text-primary transition-colors">LeadReply AI</Link>
            <Link to="/sitepeel" className="hover:text-primary transition-colors">Sitepeel UI</Link>
            <Link to="/formpulse" className="hover:text-primary transition-colors">FormPulse AI</Link>
            <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link to="/dashboard" className="text-primary hover:underline">
              Live demo ↗
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between border-t border-border pt-6 text-[11px] text-muted-foreground">
          <p>© 2026 GeoRanked. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Security</span>
          </div>
        </div>
      </footer>
    </>
  );
}
