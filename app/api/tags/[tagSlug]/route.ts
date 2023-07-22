import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  tagSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { tagSlug } = params;
  const res = await db.tag.delete({
    where: {
      slug: tagSlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { tagSlug } = params;
  const body = await request.json();
  const { label, slug, description } = body;
  const update = await db.tag.update({
    where: {
      slug: tagSlug,
    },
    data: {
      label,
      slug,
      description,
    },
  });
  return NextResponse.json(update);
}
