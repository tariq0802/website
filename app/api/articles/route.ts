import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const session = await getAuthSession();

  try {
    const { limit, page, category } = z
      .object({
        limit: z.string(),
        page: z.string(),
        category: z.string(),
      })
      .parse({
        category: url.searchParams.get("category"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const cat = await db.category.findUnique({
      where: { slug: category },
    });

    if (!cat) {
      return new Response("Category not found", { status: 500 });
    }

    const children = await db.category.findMany({
      where: { parentId: cat.id },
    });

    const categoryIds = [cat.id, ...children.map((child) => child.id)];

    const articles = await db.article.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        author: true,
        comments: true,
      },
      where: { categoryId: { in: categoryIds } },
    });

    return new Response(JSON.stringify(articles));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
