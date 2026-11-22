import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { isAdminEmail } from '@/lib/adminEmails'

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
  events: {
    // Accounts listed in ADMIN_EMAILS (server env) become admins on sign-in.
    async signIn({ user }) {
      if (user?.id && isAdminEmail(user.email) && (user as { role?: string }).role !== 'ADMIN') {
        await db.user.update({ where: { id: user.id }, data: { role: 'ADMIN' } }).catch(() => {})
      }
    },
  },
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
