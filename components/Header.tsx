import React from 'react'
import KpiGrid from "@/components/ui/kpigrid";
import GenerateButton from '@/components/ui/GenerateButton'
import { Badge } from '@/components/ui/badge';


const kpiData = [
  {
    heading: "Avg latency",
    metric: "4.8s",
    change: "+300%",
    bottom: "(baseline 1.2s)",
    badgeType: "percentage" as const,
  },
  {
    heading: "Error rate",
    metric: "12%",
    change: "Critical",
    bottom: "(baseline < 0.5%)",
    badgeType: "critical" as const,
  },
  {
    heading: "Token usage",
    metric: "2.3x",
    change: "normal volume",
    bottom: "Within expected variance",
    badgeType: "text" as const,
  },
  {
    heading: "Duration",
    metric: "14m",
    change: "active",
    bottom: "Started 14:02 UTC",
    badgeType: "text" as const,
  },
];

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-row items-center gap-2">
        <Badge
          variant="outline"
          className="rounded-sm px-3 py-1 text-sm font-medium">
          Inc 042
        </Badge>
        <Badge className="rounded-sm px-3 py-1 text-sm font-medium bg-purple-100 text-[#564787] hover:bg-purple-100">
          Latency spike
        </Badge>
      </div>

      <div className="w-full max-w-137.5 flex flex-col text-center gap-2">
        <h1 className="text-5xl lg:text-3xl font-bold text-black">
          Elevated response times detected in LLM request handling
        </h1>
        <p className="">
          Automated alerts indicate a deviation in p99 latency & detected
          abnormal latency patterns across the inference cluster.
        </p>
      </div>
      <div className="flex flex-row mt-5 mb-5 gap-4">
        {kpiData.map((kpi) => (
          <KpiGrid key={kpi.heading} {...kpi} />
        ))}
      </div>

      <GenerateButton />
    </div>
  );
}

export default Header