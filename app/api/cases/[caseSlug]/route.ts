import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  caseSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { caseSlug } = params;
  const res = await db.case.delete({
    where: {
      slug: caseSlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { caseSlug } = params;
  const body = await request.json();
  const {
    title,
    slug,
    description,
    caseNo,
    petitioner,
    respondent,
    caseCategoryId,
    casefile,
  } = body;
  const update = await db.case.update({
    where: {
      slug: caseSlug,
    },
    data: {
      title,
      slug,
      description,
      caseNo,
      petitioner,
      respondent,
      caseCategoryId,
      casefile,
    },
  });
  return NextResponse.json(update);
}
