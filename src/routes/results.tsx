import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Results, FAQ } from "@/components/marketing/sections";
export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "GeoRanked Results — GeoRanked" },
      {
        name: "description",
        content: "Explore illustrative organic search growth and AI visibility with GeoRanked.",
      },
      { property: "og:title", content: "GeoRanked Results — GeoRanked" },
      {
        property: "og:description",
        content: "Explore illustrative organic search growth and AI visibility with GeoRanked.",
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
        <Results />
        <FAQ />
      </div>
    </MarketingShell>
  );
}
