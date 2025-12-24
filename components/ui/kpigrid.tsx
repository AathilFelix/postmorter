import React from 'react'
import { ArrowUp, TriangleAlert } from 'lucide-react';
import { Badge } from './badge'

type BadgeType = 'percentage' | 'critical' | 'text' | 'none';

interface KpiProp {
    heading: string;
    metric: string;
    change?: string;
    bottom: string;
    badgeType?: BadgeType;
}

const KpiGrid = ({heading, metric, change ,bottom, badgeType = 'none'}: KpiProp) => {
    const renderBadge = () => {
      switch (badgeType) {
        case "percentage":
          // Red badge with up arrow (e.g., +300%)
          return (
            <Badge className="ml-4 rounded-[5px] bg-red-100 text-red-500 hover:bg-red-100 px-2.5 py-0.75 flex items-center gap-1">
              <ArrowUp className="w-4 h-4" />
              {change}
            </Badge>
          );
        case "critical":
          // Red badge with triangle warning
          return (
            <Badge className="ml-4 rounded-[5px] bg-red-100 text-red-500 hover:bg-red-100 px-2.5 py-0.75 flex items-center gap-1">
              <TriangleAlert className="w-4 h-4 fill-red-500" />
              {change}
            </Badge>
          );
        case "text":
          // Gray text only (e.g., "normal volume", "active")
          return (
            <span className="ml-3 text-muted-foreground text-sm">{change}</span>
          );
        case "none":
        default:
          return null;
      }
    };

  
    return (
    <div className="w-64 bg-[#F9FAFB] py-5 px-3.75 rounded-[10px]">
      <div className="flex flex-col">
        <h3 className="text-muted-foreground">{heading}</h3>
        <div className="flex flex-row items-end">
          <span className="text-5xl font-extrabold">{metric}</span>
          {renderBadge()}
        </div>
        <p className="text-muted-foreground text-sm">{bottom}</p>
      </div>
    </div>
  );
}

export default KpiGrid