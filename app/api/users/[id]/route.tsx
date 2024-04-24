import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { UserSchema } from "../schema";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (!user)
    return NextResponse.json({ error: "User not fund" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // validate req body
  const body = await request.json();
  // if not valid. return error 400 (bad request)
  const validation = UserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (parseInt(id) > 10)
    return NextResponse.json({ error: "User not fund" }, { status: 404 });
  // else fetch user with given id
  // if user does not exists, return 404 (not found)
  // update the user
  // return the updated user
  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // Fetch user from db
  // if not found, return 404
  if (parseInt(id) > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // delete the user
  // return 200 empty data
  return NextResponse.json({});
}
