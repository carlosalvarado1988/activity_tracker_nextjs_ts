import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    {
      id: 1,
      name: "Soap",
      price: 2.5,
    },
    {
      id: 2,
      name: "shampoo",
      price: 1.9,
    },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = ProductSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  return NextResponse.json(
    {
      id: 1,
      name: body.name,
      price: body.price,
    },
    { status: 201 }
  );
}
