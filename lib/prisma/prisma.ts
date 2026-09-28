import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { normalizeDatabaseUrl } from "./connection";
import { envVariables } from "@/config/env";

const connectionString = normalizeDatabaseUrl(envVariables.DATABASE_URL);

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export { prisma };
