import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {name, email, password} = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }
    const user = await db.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(body.password, 12),
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
