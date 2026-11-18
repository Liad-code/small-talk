import type { Speaker } from './types'

/**
 * One ElevenLabs voice per character. Premade voices, chosen because premade
 * voices are usable through the API on every ElevenLabs plan.
 *
 * Settings are warmer than the word profile in scripts/tts-profiles.mjs: these
 * are conversational lines, not isolated words, so expressiveness helps; the
 * speed stays a little below normal for young learners.
 */
export const SCENE_VOICES: Record<Speaker, { voiceId: string; name: string; note: string }> = {
  // one voice per scene character (premade ElevenLabs voices)
  sam: { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', note: 'Sam, the new friend — young, friendly' },
  lulu: { voiceId: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', note: 'Lulu at the ice-cream shop — bubbly, upbeat' },
  mrbrown: { voiceId: 'cjVigY5qzO86Huf0OWal', name: 'Eric', note: 'Mr. Brown, the supermarket cashier — smooth, kind' },
  penny: { voiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', note: 'Penny at the pet shop — warm, gentle' },
  emma: { voiceId: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', note: 'Emma at the clothes shop — clear, British' },
  officer: { voiceId: 'nPczCjzI2devNBz1zQrb', name: 'Brian', note: 'Officer Mike — deep, calm, helpful' },
  doctor: { voiceId: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', note: 'Dr. George — warm, reassuring, British' },
  rose: { voiceId: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', note: "Mrs. Rose, Mia's mum at the birthday party — warm, British" },
  daniel: { voiceId: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', note: 'Daniel at the airport check-in — clear, polite, British' },
  tony: { voiceId: 'iP95p4xoKVk53GoZ742B', name: 'Chris', note: 'Tony the pizza guy — charming, down-to-earth man' },
  kid: { voiceId: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', note: 'the child / role-swap customer — playful, bright, young' },
}

export const SCENE_TTS = {
  model: 'eleven_turbo_v2', // English-only: no accidental language switching (see tts-profiles.mjs)
  settings: { stability: 0.5, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true, speed: 0.9 },
}
