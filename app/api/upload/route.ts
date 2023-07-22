import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function uploadImage(
  file: Buffer,
  fileName: string
): Promise<{ fileName: string; signedUrlPut: string }> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileName}`,
    ContentType: "image/jpeg",
  });

  const signedUrlPut = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });

  return { fileName, signedUrlPut };
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const name = `images/${uuid()}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await uploadImage(buffer, name + "." + fileExtension);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}

async function generateSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedUrlGet = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return signedUrlGet;
}

export async function GET(request: NextRequest, response: NextResponse) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key) {
    return null;
  }

  try {
    const data = await generateSignedUrl(key);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
