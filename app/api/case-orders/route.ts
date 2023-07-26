import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { label, slug, order, orderDate, caseId } = body;

    const lawsuit = await db.caseOrder.create({
      data: {
        label,
        slug,
        order,
        orderDate,
        caseId,
      },
    });

    return NextResponse.json(lawsuit, { status: 200 });
  } catch (error) {
    console.log("[CASE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
