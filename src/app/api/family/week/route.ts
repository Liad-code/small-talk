import { NextResponse } from 'next/server'
import { getAccess, hasPerk } from '@/lib/access'
import { familyWeek } from '@/lib/family'

export const dynamic = 'force-dynamic'

/** Weekly sibling challenge + family goal (₪49 tier and up; admins always). */
export async function GET() {
  const access = await getAccess()
  if (!access.userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!hasPerk(access, 'sibling_challenge')) return NextResponse.json({ allowed: false })
  return NextResponse.json({ allowed: true, goalAllowed: hasPerk(access, 'family_goal'), ...(await familyWeek(access.userId)) })
}
