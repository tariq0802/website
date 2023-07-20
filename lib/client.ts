import { S3Client } from "@aws-sdk/client-s3";

export const Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAZA2CJWS2PR2NNFNJ",
    secretAccessKey: "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",
  },
});
