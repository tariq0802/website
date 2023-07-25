import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, slug, description, caseNo, petitioner, respondent, caseCategoryId, casefile } = body;

    const lawsuit = await db.case.create({
      data: { title, slug, description, caseNo, petitioner, respondent, caseCategoryId, casefile },
    });

    return NextResponse.json(lawsuit, { status: 200});
  } catch (error) {
    console.log("[CASE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
