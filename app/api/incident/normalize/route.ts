import { NextResponse } from "next/server";
import { buildNormalizedIncident } from "@/lib/normalizer";

export async function POST(req: Request) {
  const body = await req.json();

  // expect:
  // { logs: [...], metrics: [...] }
  const normalized = buildNormalizedIncident(
    body.logs ?? [],
    body.metrics ?? []
  );

  return NextResponse.json(normalized);
}
