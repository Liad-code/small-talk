import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** Does a file exist in public/? Public content pages are built statically, so this runs at build time. */
export function publicFileExists(urlPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', urlPath))
}
