import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  authoritySlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { authoritySlug } = params;
  const res = await db.recruitmentBoard.delete({
    where: {
      slug: authoritySlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { authoritySlug } = params;
  const body = await request.json();
  const { label, slug, website, description } = body;
  const update = await db.recruitmentBoard.update({
    where: {
      slug: authoritySlug,
    },
    data: {
      label,
      slug,
      website,
      description,
    },
  });
  return NextResponse.json(update);
}
