import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function resizeAndUploadImage(
  fileBuffer: Buffer,
  maxWidth: number,
  maxHeight: number,
  fileExtension: string
): Promise<string> {
  const resizedImage = await sharp(fileBuffer)
    .resize({ width: maxWidth, height: maxHeight, fit: "inside" })
    .toBuffer();

  const fileName = `images/${uuid()}.${fileExtension}`;
  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: resizedImage,
    ContentType: "image/jpeg",
  });

  await s3Client.send(putCommand);

  return fileName;
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
    const fileExtension = file.type.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const resizedFileName = await resizeAndUploadImage(
      buffer,
      640,
      480,
      fileExtension
    );

    const signedUrlGet = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: resizedFileName,
      }),
      {
        expiresIn: 3600,
      }
    );

    return NextResponse.json({
      success: true,
      data: {
        fileName: resizedFileName,
        signedUrlGet,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const { imageUrl } = await request.json();
    const imageKey = imageUrl.split(".com/")[1];
    
    const signedUrlDelete = await getSignedUrl(
      s3Client,
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
      }),
      {
        expiresIn: 60,
      }
    );

    await fetch(signedUrlDelete, {
      method: "DELETE",
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Error deleting image" },
      { status: 500 }
    );
  }
}