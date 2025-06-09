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
  backgroundColor: "#c3c3c3",
  scene: [MainGame],
}

function StartGame(parent: string) {
  return new Game({ ...config, parent })
}

export default StartGame
