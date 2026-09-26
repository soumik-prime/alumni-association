import { prisma } from "@/lib/prisma/prisma";

export function findProfileByReg(regNo: string) {
  return prisma.profile.findUnique({
    where: { regNo, visible: true },
    include: {
      permanentAddress: {
        include: {
          country: true,
        },
      },
      presentAddress: {
        include: {
          country: true,
        },
      },
      educations: {
        include: {
          institution: true,
        },
      },
      workExperiences: {
        include: {
          company: true,
        },
      },
      // Publications are linked through the publication_authors join table.
      publicationAuthors: {
        include: {
          publication: {
            include: {
              authors: {
                include: {
                  student: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
