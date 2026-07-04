import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'database' },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // Expose id + role to the app (used for /admin gating and tenant scoping)
      session.user.id = user.id
      session.user.role = (user as { role?: 'PARENT' | 'ADMIN' }).role ?? 'PARENT'
      return session
    },
  },
  pages: {
    // default Auth.js pages for now; custom Hebrew sign-in page comes in Phase 6
  },
})
