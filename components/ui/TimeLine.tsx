import { Dot } from 'lucide-react';
import React from 'react'

interface TimelineItemProps {
  time: string;
  text: string;
}


const TimeLine = ({ time = "14:01", text = "Elevated P99 latency detected and alert triggered" }: TimelineItemProps) => {
  return (
    <div className="flex flex-row items-center min-h-17.5 gap-3.75">
      <div className="min-w-12.5 text-center">{time}</div>
      <div className="flex flex-col items-center justify-center bg-[#00000033] w-px h-17.5">
        <Dot size={24} strokeWidth={7} className="text-[#564787]" />
      </div>
      <p className='flex text-center'>{text}</p>
    </div>
  );
}

export default TimeLine