import React from "react";
import HeadsUp from "@/components/ui/HeadsUp";

interface TextBodyProps {
  heading: string;
  content: string;
  variant?: "default" | "warning" | "info";
  warningText?: string;
}

const TextBody = ({ heading, content, variant="default", warningText }: TextBodyProps) => {
  return (
    <section className="flex flex-col gap-2.5">
      <h1 className="text-xl font-semibold">{heading}</h1>
      {variant === "info" && (
        <HeadsUp
          heading="Generated from available logs and metrics"
          message="This analysis is an inference based on system events. It requires human validation to confirm accuracy"
        />
      )}
      {variant === "warning" && (
        <div className="text-muted-foreground">
          {warningText}
        </div>
      )}
      <div className="">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default TextBody;
