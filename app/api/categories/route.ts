import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { label, slug, description, image, parentId } = body;

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const category = await db.category.create({
      data: { label, slug, description, image, parentId: parentId || null },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
