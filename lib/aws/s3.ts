import "server-only";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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

/** Store a member photo in the private bucket. It is read only through our app route. */
export async function putProfilePhoto(profileId: string, body: Uint8Array, contentType: string) {
  await s3Client.send(new PutObjectCommand({
    Bucket: envVariables.S3_BUCKET,
    Key: profilePhotoKey(profileId),
    Body: body,
    ContentType: contentType,
    CacheControl: "private, max-age=0, no-cache",
  }));
}

export async function getProfilePhoto(profileId: string) {
  return s3Client.send(new GetObjectCommand({
    Bucket: envVariables.S3_BUCKET,
    Key: profilePhotoKey(profileId),
  }));
}

export function profilePhotoPath(profileId: string) {
  return `/api/profile-photos/${profileId}`;
}

function profilePhotoKey(profileId: string) {
  return `profile-photos/${profileId}`;
}
