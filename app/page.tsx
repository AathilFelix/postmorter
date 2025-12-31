"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import GenerateButton from "@/components/ui/GenerateButton";
import { useRouter } from "next/navigation";


async function generate() {
  await fetch("/api/generate-postmortem", {
    method: "POST",
  });
}

export default function Home() {
  const router = useRouter();

  async function handleSimulate() {
    // 1. Trigger the backend simulation
    fetch("/api/generate-postmortem", { method: "POST" });

    // 2. Immediately go to loading screen
    router.push("/loading");
  }

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
          <GenerateButton text="Simulate Incident" variant="string" icon onClick={handleSimulate}/>
          <p className="text-sm text-muted-foreground">
            A new incident and postmortem will be generated for demonstration
            purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
