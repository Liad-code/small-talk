/**
 * Short-lived "this session may use the app" token, checked by the middleware on every
 * page without touching the database. Uses Web Crypto only, so it runs in the Edge
 * middleware and in Node route handlers alike.
 *
 * value = `${expiresAtSeconds}.${base64url(HMAC-SHA256(AUTH_SECRET, sessionToken + "|" + expiresAt))}`
 * Bound to the Auth.js session token → useless after sign-out or for another account.
 */
export const ACCESS_COOKIE = 'smalltalk_access'
export const ACCESS_TTL_SECONDS = 30 * 60 // re-checked against the database every 30 minutes

export const SESSION_COOKIES = ['__Secure-authjs.session-token', 'authjs.session-token']

const enc = new TextEncoder()

async function sign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)))
  let bin = ''
  for (let i = 0; i < sig.length; i++) bin += String.fromCharCode(sig[i])
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function makeAccessToken(sessionToken: string, secret: string, now = Date.now()): Promise<string> {
  const exp = Math.floor(now / 1000) + ACCESS_TTL_SECONDS
  return `${exp}.${await sign(secret, `${sessionToken}|${exp}`)}`
}

export async function verifyAccessToken(token: string, sessionToken: string, secret: string | undefined, now = Date.now()): Promise<boolean> {
  if (!secret || !token || !sessionToken) return false
  const dot = token.indexOf('.')
  if (dot < 1) return false
  const exp = Number(token.slice(0, dot))
  if (!Number.isFinite(exp) || exp * 1000 < now) return false
  const expected = await sign(secret, `${sessionToken}|${exp}`)
  const given = token.slice(dot + 1)
  if (given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}
