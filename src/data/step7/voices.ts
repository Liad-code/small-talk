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
  tony: { voiceId: 'iP95p4xoKVk53GoZ742B', name: 'Chris', note: 'Tony the pizza guy — charming, down-to-earth man' },
  kid: { voiceId: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', note: 'the child / role-swap customer — playful, bright, young' },
}

export const SCENE_TTS = {
  model: 'eleven_turbo_v2', // English-only: no accidental language switching (see tts-profiles.mjs)
  settings: { stability: 0.5, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true, speed: 0.9 },
}
