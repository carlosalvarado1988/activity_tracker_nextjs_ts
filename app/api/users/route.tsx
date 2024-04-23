import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    {
      id: 1,
      name: "Carlos",
    },
    {
      id: 2,
      name: "Andres",
    },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = UserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });
  return NextResponse.json(
    [
      {
        id: 1,
        name: body.name,
      },
    ],
    { status: 201 }
  );
}
