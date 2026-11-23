import type { SceneBundle, Speaker } from './types'

/**
 * Every recorded line of a scene + its story, with its speaker — what
 * scripts/generate-scene-audio.mjs records. The character's lines use the
 * scene's character voice; the child's lines (and the role-swap customer) the
 * kid voice. Duplicates (same speaker + text) are one recording.
 */
export function bundleLines({ scene, story }: SceneBundle): { speaker: Speaker; text: string }[] {
  const char = scene.character.speaker
  const out: { speaker: Speaker; text: string }[] = []
  for (const s of scene.steps) {
    out.push({ speaker: char, text: s.ask })
    for (const o of s.options) {
      out.push({ speaker: 'kid', text: o.say })
      if (o.reaction) out.push({ speaker: char, text: o.reaction })
    }
    out.push({ speaker: char, text: s.swapSilly.say })
    out.push({ speaker: 'kid', text: s.swapSilly.reaction })
  }
  out.push({ speaker: char, text: scene.lines.farewell })
  out.push({ speaker: 'kid', text: scene.lines.makeRight })
  out.push({ speaker: 'kid', text: scene.lines.makeWrong })
  for (const p of scene.phrases) out.push({ speaker: p.speaker, text: p.en })

  for (const n of story.nodes) {
    for (const l of n.lines) out.push({ speaker: char, text: l.text })
    for (const c of n.choices ?? []) {
      out.push({ speaker: 'kid', text: c.say })
      if (c.reply) out.push({ speaker: char, text: c.reply.text })
      if (c.silly) out.push({ speaker: char, text: c.silly.text })
    }
    if (n.event && n.event !== 'oven') out.push({ speaker: char, text: n.event.doneLine.text })
    if (n.pick) {
      for (const o of n.pick.options) out.push({ speaker: 'kid', text: o.say })
      out.push({ speaker: 'kid', text: n.pick.closer })
      if (n.pick.reply) out.push({ speaker: char, text: n.pick.reply.text })
    }
  }
  if (story.soldOut) out.push({ speaker: char, text: story.soldOut.text })
  for (const l of Object.values(story.oven ?? {})) out.push({ speaker: char, text: l.text })

  const seen = new Set<string>()
  return out.filter(l => {
    const k = `${l.speaker}|${l.text.trim().toLowerCase()}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}
