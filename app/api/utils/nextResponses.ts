import { NextResponse } from "next/server";

export function reportError(error: any, status: number) {
  let message = "Unknown Error";
  if (typeof error === "string") message = error;
  if (error instanceof Error) message = error.message;
  if (typeof error === "object") message = error[0]?.message;
  return NextResponse.json({ error: message }, { status });
}
