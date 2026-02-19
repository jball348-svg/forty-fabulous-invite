import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In Prisma 7, we need to provide either accelerateUrl or adapter to PrismaClient
// Use PRISMA_DATABASE_URL (Accelerate URL) or DATABASE_URL for the connection
const databaseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('PRISMA_DATABASE_URL or DATABASE_URL environment variable must be set')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  accelerateUrl: databaseUrl,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
