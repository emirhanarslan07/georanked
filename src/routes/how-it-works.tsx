import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { HowItWorks, FAQ } from "@/components/marketing/sections";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Overrank works — Overrank" },
      { name: "description", content: "Discover, create, publish and grow with autonomous SEO." },
      { property: "og:title", content: "How Overrank works — Overrank" },
      {
        property: "og:description",
        content: "Discover, create, publish and grow with autonomous SEO.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <MarketingShell>
      <div className="pt-28">
        <HowItWorks />
        <FAQ />
      </div>
    </MarketingShell>
  );
}
