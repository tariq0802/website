import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      label,
      slug,
      description,
      vacancy,
      lastDate,
      salary,
      qualification,
      recruitmentBoardId,
    } = body;

    const recruitment = await db.recruitment.create({
      data: {
        label,
        slug,
        description,
        vacancy,
        lastDate,
        salary,
        qualification,
        recruitmentBoardId,
      },
    });

    return NextResponse.json(recruitment, { status: 200 });
  } catch (error) {
    console.log("[CASE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
