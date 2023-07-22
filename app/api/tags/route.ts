import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { label, slug, description } = body;

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const tag = await db.tag.create({
      data: { label, slug, description },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
