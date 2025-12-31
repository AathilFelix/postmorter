"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import GenerateButton from "@/components/ui/GenerateButton";

async function generate() {
  await fetch("/api/generate-postmortem", {
    method: "POST",
  });
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        <div className="gap-2.5">
          <h1 className="font-extrabold text-center text-[72px]">
            AI Incident Postmortem generator
          </h1>
          <p className="text-center text-muted-foreground">
            Generate clear, structured postmortems for incidents in LLM-powered
            systems
          </p>
        </div>
        <div className="flex flex-col gap-1.25">
          <GenerateButton
            text="Simulate Incident"
            variant="string"
            icon
          />
          <p className="text-sm text-muted-foreground">
            A new incident and postmortem will be generated for demonstration
            purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
