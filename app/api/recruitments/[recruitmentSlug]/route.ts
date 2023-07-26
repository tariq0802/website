import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  recruitmentSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { recruitmentSlug } = params;
  const res = await db.recruitment.delete({
    where: {
      slug: recruitmentSlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { recruitmentSlug } = params;
  const body = await request.json();
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
  const update = await db.recruitment.update({
    where: {
      slug: recruitmentSlug,
    },
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
  return NextResponse.json(update);
}
