import { NextResponse } from 'next/server'
import { getAccess } from '@/lib/access'

export const dynamic = 'force-dynamic'

/** For the client: may this visitor use the whole app? (Step 1 menus show lock badges otherwise.) */
export async function GET() {
  const a = await getAccess()
  return NextResponse.json({ signedIn: a.signedIn, app: a.app, admin: a.admin })
}
