import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge';

interface ActionItemProps {
  heading: string;
  content: string;
  priority: string;
  team: string;
}

const ActionItem = ({ heading, content, priority, team }: ActionItemProps) => {
  return (
    <div className="flex flex-row gap-2.5 w-full">
      <div>
        <Checkbox className="data-[state=checked]:bg-[#564787] data-[state=checked]:border-[#564787]" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2.5 items-start justify-between">
          <h2 className="text-lg/[20px] font-semibold">
            {heading}
          </h2>
          <Badge className="rounded-[5px] bg-[#F0F0F0] text-[#00000080]">
            {priority} priority
          </Badge>
        </div>
        <p className="text-[16px]/[20px]">
          {content}
        </p>
        <p className="text-[#00000082] text-sm">{team}-team</p>
      </div>
    </div>
  );
}

export default ActionItem