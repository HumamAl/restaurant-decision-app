"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartDataPoint } from "@/lib/types";

interface ActivityChartProps {
  data: ChartDataPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3">
      <p className="text-sm font-medium mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: entry.color as string }}
          />
          {entry.name}: <span className="font-mono font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function ActivityChart({ data }: ActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 4, right: 16, left: -8, bottom: 4 }}
      >
        <defs>
          <linearGradient id="fillDecisions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.5}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "var(--muted-foreground)" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          name="Decisions"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillDecisions)"
          dot={false}
          activeDot={{ r: 4, fill: "var(--chart-1)" }}
        />
        <Area
          type="monotone"
          dataKey="target"
          name="Target"
          stroke="var(--chart-3)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="url(#fillTarget)"
          dot={false}
          activeDot={{ r: 3, fill: "var(--chart-3)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
