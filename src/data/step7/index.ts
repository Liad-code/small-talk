import type { SceneBundle } from './types'
import { PIZZERIA } from './pizzeria'
import { PIZZERIA_STORY } from './pizzeriaStory'
import { BUNDLE as newFriend } from './scenes/new-friend'
import { BUNDLE as iceCream } from './scenes/ice-cream'
import { BUNDLE as supermarket } from './scenes/supermarket'
import { BUNDLE as petShop } from './scenes/pet-shop'
import { BUNDLE as clothesShop } from './scenes/clothes-shop'
import { BUNDLE as directions } from './scenes/directions'
import { BUNDLE as doctor } from './scenes/doctor'
import { BUNDLE as birthday } from './scenes/birthday'
import { BUNDLE as airport } from './scenes/airport'

/**
 * Every Step 7 scene, in the order shown on the hub (easy → hard). Each scene
 * file in ./scenes exports BUNDLE = { scene, story }; the audio generator reads
 * that folder directly, so a new scene only needs its file + a line here.
 */
export const SCENE_BUNDLES: SceneBundle[] = [
  { scene: PIZZERIA, story: PIZZERIA_STORY },
  newFriend,
  iceCream,
  supermarket,
  petShop,
  clothesShop,
  directions,
  doctor,
  birthday,
  airport,
]

export function bundleById(id: string): SceneBundle | undefined {
  return SCENE_BUNDLES.find(b => b.scene.id === id)
}
