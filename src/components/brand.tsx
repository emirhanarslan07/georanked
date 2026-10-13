import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import wordpress from "@/assets/logos/wordpress.svg.asset.json";
import shopify from "@/assets/logos/shopify.svg.asset.json";
import webflow from "@/assets/logos/webflow.svg.asset.json";
import openai from "@/assets/logos/openai.svg.asset.json";
import perplexity from "@/assets/logos/perplexity.svg.asset.json";
import gemini from "@/assets/logos/googlegemini.svg.asset.json";
import google from "@/assets/logos/google.svg.asset.json";
const logos: Record<string, { url: string }> = {
  WordPress: wordpress,
  Shopify: shopify,
  Webflow: webflow,
  ChatGPT: openai,
  Perplexity: perplexity,
  Gemini: gemini,
  Google: google,
};
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Overrank home"
      className="inline-flex shrink-0 items-center gap-2.5 text-[21px] font-extrabold text-foreground sm:text-[24px]"
    >
      <span className="brand-symbol flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ArrowUpRight className="size-6" strokeWidth={3} />
      </span>
      {!compact && (
        <span>
          overrank<span className="text-primary">.</span>
        </span>
      )}
    </Link>
  );
}
export function PlatformLogo({ name, iconOnly = false }: { name: string; iconOnly?: boolean }) {
  const asset = logos[name];
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 font-semibold">
      {asset && (
        <span
          role="img"
          aria-label={`${name} logo`}
          className={`platform-logo size-5 shrink-0 ${iconOnly ? "" : "sm:size-6"}`}
          style={{ maskImage: `url("${asset.url}")`, WebkitMaskImage: `url("${asset.url}")` }}
        />
      )}
      {!iconOnly && name}
    </span>
  );
}
