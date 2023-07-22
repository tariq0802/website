import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  categorySlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { categorySlug } = params;
  const res = await db.category.delete({
    where: {
      slug: categorySlug,
    },
  });
  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { categorySlug } = params;
  const body = await request.json();
  const { label, slug, image, description } = body;
  const update = await db.category.update({
    where: {
      slug: categorySlug,
    },
    data: {
      label,
      slug,
      image,
      description,
    },
  });
  return NextResponse.json(update);
}
