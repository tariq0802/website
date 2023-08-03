import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  articleSlug: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const { articleSlug } = params;
  
  const res = await db.article.delete({
    where: {
      slug: articleSlug,
    },
  });

  return NextResponse.json(res);
}

export async function PATCH(request: Request, { params }: { params: Iparams }) {
  const { articleSlug } = params;
  const body = await request.json();
  const {
    title,
    titleSlug,
    slug,
    categoryId,
    authorId,
    description,
    caseId,
    recruitmentId,
    image,
    content,
    tagIds,
  } = body;

  const update = await db.article.update({
    where: {
      slug: articleSlug,
    },
    data: {
      title,
      titleSlug,
      slug,
      categoryId,
      authorId,
      description,
      caseId,
      recruitmentId,
      image,
      content,
      tags: {
        set: tagIds.map((tagId: string) => ({
          id: tagId,
        })),
      },
    },
  });
  return NextResponse.json(update);
}
