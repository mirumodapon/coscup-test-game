import { Scene } from 'phaser'
import { HexTile } from '../TileData'
import { EventBus } from '../EventBus'

const SKEW = 0.6

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

    const center = Math.round(cols / 2)
    for (let row = -6; row < 0; row++) {
      const x = startX + center * spacingX
      const y = startY + row * spacingY * 2

      const hex = new HexTile(this, x, y, size, 0xffda3a, SKEW)
      this.add.existing(hex)
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = (row % 2) * size * 1.5
        const x = startX + col * spacingX + offsetX
        const y = startY + row * spacingY

        const hex = new HexTile(this, x, y, size, 0x3aff3a, SKEW)
        this.add.existing(hex)
      }
    }

    EventBus.emit('current-scene-ready', this)
  }
}
