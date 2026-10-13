import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const series = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  clicks: Math.round(140 + i * i * 14 + Math.sin(i * 1.9) * 130),
}));
export function TrafficChart({ compact = false }: { compact?: boolean }) {
  const [period, setPeriod] = useState("30 days");
  return (
    <div className="min-w-0 rounded-lg border border-border bg-card p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Organic clicks</div>
          <div className="mt-1 flex items-center gap-3">
            <strong className="text-3xl">{period === "30 days" ? "24,892" : "68,241"}</strong>
            <span className="rounded bg-success-soft px-2 py-1 text-xs font-semibold text-success">
              ↗ 184.6%
            </span>
          </div>
        </div>
        <div className="flex rounded-md border border-border p-1">
          {["30 days", "90 days"].map((p) => (
            <Button
              key={p}
              size="sm"
              variant={p === period ? "secondary" : "ghost"}
              onClick={() => setPeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
      <div className={compact ? "h-56" : "h-72"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={series.map((s) => ({
              ...s,
              clicks: s.clicks * (period === "90 days" ? 2.75 : 1),
            }))}
            margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={compact ? "chart-small" : "chart-large"}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 4" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              minTickGap={45}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `Sep ${v}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
              labelFormatter={(v) => `September ${v}`}
              formatter={(v) => [Number(v).toLocaleString(), "Clicks"]}
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="clicks"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill={`url(#${compact ? "chart-small" : "chart-large"})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" /> Google Search Console
        </span>
        <span>Illustrative demo data</span>
      </div>
    </div>
  );
}
