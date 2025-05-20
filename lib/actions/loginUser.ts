'use server'

import { prisma } from 'lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials')
  }

  // логіка входу (можна використати NextAuth або сесію)
  if (user.role === 'ADMIN') {
    redirect('/admin')
  } else {
    redirect('/client')
  }
}