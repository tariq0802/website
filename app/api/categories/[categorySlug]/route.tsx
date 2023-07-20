import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { CronJob } from "cron";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { string } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
