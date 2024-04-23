import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "../schema";

interface Props {
  params: { id: number };
}

export function GET(request: NextRequest, { params: { id } }: Props) {
  // Fetch data from db
  // if not found, return 404
  if (id > 10)
    return NextResponse.json({ error: "User not fund" }, { status: 404 });
  // else return data
  return NextResponse.json({ id: 1, name: "Carlos" });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // validate req body
  const body = await request.json();
  // if not valid. return error 400 (bad request)
  const validation = UserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (id > 10)
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
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // delete the user
  // return 200 empty data
  return NextResponse.json({});
}
