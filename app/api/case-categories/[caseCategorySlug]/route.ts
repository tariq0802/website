import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  caseCategorySlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { caseCategorySlug } = params;
  const res = await db.caseCategory.delete({
    where: {
      slug: caseCategorySlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { caseCategorySlug } = params;
  const body = await request.json();
  const { label, slug, description } = body;
  const update = await db.caseCategory.update({
    where: {
      slug: caseCategorySlug,
    },
    data: {
      label,
      slug,
      description,
    },
  });
  return NextResponse.json(update);
}
