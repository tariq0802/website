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
  const { label, title, slug, image, description, parentId } = body;
  const update = await db.category.update({
    where: {
      slug: categorySlug,
    },
    data: {
      label,
      title,
      slug,
      image,
      description,
      parentId,
    },
  });
  return NextResponse.json(update);
}
