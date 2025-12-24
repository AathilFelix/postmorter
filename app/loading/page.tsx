"use client"

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const LoadingPage = () => {

  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-12">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black">
            Generating postmortem
            <span className="inline-block w-[1.5ch] text-left">{dots}</span>
          </h1>
        </div>
        <div>
          <p className="text-xl font-normal">
            Gathering incident data and structuring events
          </p>
          <p className="text-muted-foreground">(May take a few seconds)</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
