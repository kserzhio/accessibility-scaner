// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

declare global {
  // Avoid multiple PrismaClient instances in development
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // можна видалити у production
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
