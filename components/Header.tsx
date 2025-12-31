
"use client";
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
type Props = {
  onGenerate: () => void;
};

interface HeaderProps {
  id: string;
  incident: string;
}

const Header = ({ id, incident }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-row items-center gap-2">
        <Badge
          variant="outline"
          className="rounded-sm px-3 py-1 text-sm font-medium">
          Inc {id}
        </Badge>
        <Badge className="rounded-sm px-3 py-1 text-sm font-medium bg-purple-100 text-[#564787] hover:bg-purple-100">
          {incident}
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

      <div className="flex flex-col gap-2 mt-2 items-center">
        <GenerateButton text="Generate postmortem" />
        <div className='flex flex-row gap-2.5 items-center'>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_24_272)">
              <path
                d="M12.1875 2.34375H2.8125C2.56386 2.34375 2.3254 2.44252 2.14959 2.61834C1.97377 2.79415 1.875 3.03261 1.875 3.28125V6.5625C1.875 9.65156 3.37031 11.5236 4.6248 12.5502C5.97598 13.6553 7.32012 14.0303 7.37871 14.0461C7.45928 14.068 7.54424 14.068 7.6248 14.0461C7.6834 14.0303 9.02578 13.6553 10.3787 12.5502C11.6297 11.5236 13.125 9.65156 13.125 6.5625V3.28125C13.125 3.03261 13.0262 2.79415 12.8504 2.61834C12.6746 2.44252 12.4361 2.34375 12.1875 2.34375ZM10.1766 6.42539L6.89531 9.70664C6.85178 9.75022 6.80008 9.7848 6.74318 9.80839C6.68627 9.83198 6.62527 9.84412 6.56367 9.84412C6.50207 9.84412 6.44107 9.83198 6.38417 9.80839C6.32726 9.7848 6.27557 9.75022 6.23203 9.70664L4.82578 8.30039C4.73782 8.21243 4.68841 8.09314 4.68841 7.96875C4.68841 7.84436 4.73782 7.72507 4.82578 7.63711C4.91374 7.54915 5.03303 7.49974 5.15742 7.49974C5.28181 7.49974 5.40111 7.54915 5.48906 7.63711L6.5625 8.71231L9.51211 5.76211C9.55566 5.71856 9.60736 5.68401 9.66427 5.66044C9.72117 5.63687 9.78216 5.62474 9.84375 5.62474C9.90534 5.62474 9.96633 5.63687 10.0232 5.66044C10.0801 5.68401 10.1318 5.71856 10.1754 5.76211C10.2189 5.80566 10.2535 5.85736 10.2771 5.91427C10.3006 5.97117 10.3128 6.03216 10.3128 6.09375C10.3128 6.15534 10.3006 6.21633 10.2771 6.27323C10.2535 6.33014 10.2189 6.38184 10.1754 6.42539H10.1766Z"
                fill="#96A5B9"
              />
            </g>
            <defs>
              <clipPath id="clip0_24_272">
                <rect width="15" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-muted-foreground text-sm">
            Uses logs and metrics to generate a structured postmortem.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;