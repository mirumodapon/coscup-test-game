import { Scene } from 'phaser'
import { HexTile } from '../TileData'
import { EventBus } from '../EventBus'

const SKEW = 0.6

function randomColor() {
  const x = Math.random();
  if (x < 0.25) {
    return 0xF8C0C8;
  }
  else if (x < 0.5) {
    return 0xD3BBDD;
  }
  else {
    return 0xECE3F0;
  }
}

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  preload() {
    this.load.setPath('assets')
  }

  create() {
    const screenWidth = this.cameras.main.width
    const screenHeight = this.cameras.main.height
    const size = Math.min(screenHeight / 10, screenWidth / 8)

    const spacingX = size * 3
    const spacingY = (Math.sqrt(3) * size * SKEW) / 2
    const cols = screenWidth / spacingX + 1
    const rows = 4

    const startY = screenHeight - spacingY * (rows + 1)
    const startX = 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = (row % 2) * size * 1.5
        const x = startX + col * spacingX + offsetX
        const y = startY + row * spacingY

        const hex = new HexTile(this, x, y, size, randomColor(), SKEW)
        this.add.existing(hex)
      }
    }

    EventBus.emit('current-scene-ready', this)
  }
}
