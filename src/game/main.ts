import type { Types } from 'phaser'
import { AUTO, Game } from 'phaser'
import { Game as MainGame } from './scenes/Game'

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
  type: AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game-container",
  backgroundColor: "#EFE7D3"
}

export async function StartGame(parent: string): Promise<Phaser.Game> {
  const res = await fetch('https://coscup.org/2024/json/sponsor.json')
  const json = await res.json()
  const boothIDs: string[] = json.map((s: any) => (s.id))

  const scene = new MainGame(boothIDs)

  return new Game({
    ...config,
    parent,
    scene: [scene],
  })
}

export default StartGame
