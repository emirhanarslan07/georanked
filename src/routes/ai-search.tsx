import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { AISearch, FAQ } from "@/components/marketing/sections";
export const Route = createFileRoute("/ai-search")({
  head: () => ({
    meta: [
      { title: "AI Search Visibility — Overrank" },
      { name: "description", content: "Get discovered and cited in ChatGPT and Perplexity." },
      { property: "og:title", content: "AI Search Visibility — Overrank" },
      {
        property: "og:description",
        content: "Get discovered and cited in ChatGPT and Perplexity.",
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
        <AISearch />
        <FAQ />
      </div>
    </MarketingShell>
  );
}
