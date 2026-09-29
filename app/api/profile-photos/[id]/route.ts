import { NextResponse } from "next/server";
import { getProfilePhoto, profilePhotoPath } from "@/lib/aws/s3";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await prisma.profile.findUnique({ where: { id }, select: { photo: true } });

  if (!profile || profile.photo !== profilePhotoPath(id)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const object = await getProfilePhoto(id);
    if (!object.Body) return new NextResponse(null, { status: 404 });
    return new NextResponse(object.Body.transformToWebStream(), {
      headers: {
        "Content-Type": object.ContentType ?? "application/octet-stream",
        "Cache-Control": "private, max-age=0, no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
    if (status === 404) return new NextResponse(null, { status: 404 });
    throw error;
  }
}
