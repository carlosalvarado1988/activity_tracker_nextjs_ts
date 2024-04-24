import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { UserSchema } from "./schema";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
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
