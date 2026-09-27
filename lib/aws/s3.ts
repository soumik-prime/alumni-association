import "server-only";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { envVariables } from "@/config/env";
import { s3Client } from "./s3-client";

export const createPresignedUploadUrl = async (
  folder: string,
  key: string,
  contentType: string,
  expiresIn: number = 300,
) => {
  const objectKey = `${folder}/${key}`;

  const command = new PutObjectCommand({
    Bucket: envVariables.S3_BUCKET,
    Key: objectKey,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, {
    expiresIn,
  });
};