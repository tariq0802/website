import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  caseOrderSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { caseOrderSlug } = params;
  const res = await db.caseOrder.delete({
    where: {
      slug: caseOrderSlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { caseOrderSlug } = params;
  const body = await request.json();
  const { label, slug, order, orderDate, caseId } = body;
  const update = await db.caseOrder.update({
    where: {
      slug: caseOrderSlug,
    },
    data: {
      label,
      slug,
      order,
      orderDate,
      caseId,
    },
  });
  return NextResponse.json(update);
}
