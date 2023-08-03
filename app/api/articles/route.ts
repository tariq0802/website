import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      titleSlug,
      categoryId,
      authorId,
      description,
      caseId,
      recruitmentId,
      image,
      content,
      tagIds,
    } = body;

    const article = await db.article.create({
      data: {
        title,
        slug,
        titleSlug,
        categoryId,
        authorId,
        description,
        caseId,
        recruitmentId,
        image,
        content,
        tags: {
          connect: tagIds.map((tagId: string) => ({
            id: tagId,
          })),
        },
      },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("[CASE_POST] Error:", error);
    return new NextResponse(
      "An error occurred while processing your request.",
      { status: 500 }
    );
  }
}
