import { PrismaClient } from "@prisma/client";

// Mantiene una única conexión a la base de datos en modo desarrollo
// para evitar agotar el límite de conexiones de PostgreSQL.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;