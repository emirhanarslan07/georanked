import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Pricing, FAQ } from "@/components/marketing/sections";
export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "GeoRanked Pricing — GeoRanked" },
      { name: "description", content: "Autonomous SEO and GEO plans from $39 per month." },
      { property: "og:title", content: "GeoRanked Pricing — GeoRanked" },
      { property: "og:description", content: "Autonomous SEO and GEO plans from $39 per month." },
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
        <Pricing />
        <FAQ />
      </div>
    </MarketingShell>
  );
}
