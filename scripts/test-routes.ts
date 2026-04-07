/**
 * test-routes.ts
 * Run: npx tsx scripts/test-routes.ts
 *
 * Starts a Next.js production server and verifies every subject route
 * returns HTTP 200 (no crashes, no missing data).
 *
 * Requires a prior `npm run build` and `npm start` on port 3000.
 * OR pass BASE_URL env var to point at any running instance:
 *   BASE_URL=http://localhost:3000 npx tsx scripts/test-routes.ts
 */

import { SUBJECTS } from '../src/data/subjects'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const LEVELS: number[] = [1, 2, 3]

interface RouteResult {
  url: string
  status: number | 'ERROR'
  ok: boolean
  error?: string
}

async function checkRoute(path: string): Promise<RouteResult> {
  const url = `${BASE_URL}${path}`
  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'text/html' },
      signal: AbortSignal.timeout(10_000),
    })
    return { url, status: res.status, ok: res.status < 400 }
  } catch (err: any) {
    return { url, status: 'ERROR', ok: false, error: err.message }
  }
}

async function main() {
  console.log('\n══════════════════════════════════════════════════════════')
  console.log('  SMALL TALK — ROUTE TEST REPORT')
  console.log(`  Target: ${BASE_URL}`)
  console.log(`  Subjects: ${SUBJECTS.length}`)
  console.log('══════════════════════════════════════════════════════════\n')

  const routes: string[] = []

  // Subject overview pages
  for (const subject of SUBJECTS) {
    routes.push(`/subject/${subject.id}`)
    for (const level of LEVELS) {
      routes.push(`/lesson/${subject.id}/${level}`)
      routes.push(`/quiz/${subject.id}/${level}`)
    }
  }

  // Extras
  routes.push('/')
  routes.push('/profile')

  console.log(`Checking ${routes.length} routes...\n`)

  const results = await Promise.all(routes.map(checkRoute))

  const failures = results.filter(r => !r.ok)
  const successes = results.filter(r => r.ok)

  console.log(`✅  ${successes.length} routes OK`)
  if (failures.length > 0) {
    console.log(`❌  ${failures.length} routes FAILED:\n`)
    for (const f of failures) {
      console.log(`   [${f.status}] ${f.url}`)
      if (f.error) console.log(`         ${f.error}`)
    }
  }

  console.log('\n══════════════════════════════════════════════════════════\n')
  process.exit(failures.length > 0 ? 1 : 0)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
