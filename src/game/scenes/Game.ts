import { Scene } from 'phaser'
import { HexTile } from '../TileData'
import { EventBus } from '../EventBus'
import { GameData } from '../GameData'

function randomColor() {
  const x = Math.random()
  if (x < 0.25) {
    return 0xF8C0C8
  }
  else if (x < 0.5) {
    return 0xD3BBDD
  }
  else {
    return 0xECE3F0
  }
}

function shiftCamera(scene: Phaser.Scene, amount: number) {
  const cam = scene.cameras.main;
  scene.tweens.add({
    targets: cam,
    scrollY: cam.scrollY + amount,
    duration: 1000,
    ease: 'Sine.easeInOut'
  });
}

export class Game extends Scene {
  private contentContainer!: Phaser.GameObjects.Container
  private dragStartY = 0
  private containerStartY = 0

  constructor() {
    super('Game')
  }

  preload() {
    this.load.setPath('assets')
  }

  create() {
    const bottomBarHeight = 40
    GameData.screenWidth = this.cameras.main.width
    GameData.screenHeight = this.cameras.main.height
    GameData.hexSize = Math.min(GameData.screenHeight / 10, GameData.screenWidth / 8)


    const spacingX = GameData.hexWidth * 1.5
    const spacingY = GameData.hexHeight * 0.5
    const cols = GameData.screenWidth / spacingX + 1
    const rows = 4
    const center = Math.round(cols / 2) - 1
    const startY = GameData.screenHeight - spacingY * (rows + 1)
    const startX = 0

      this.contentContainer = this.add.container(0, 0)

     for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = (row % 2) * GameData.hexSize * 1.5
        const x = startX + col * spacingX + offsetX
        const y = startY + row * spacingY

        const tile = new HexTile(this, x, y, GameData.hexSize, randomColor(), GameData.skew)
        this.contentContainer.add(tile)

        if (row === 0 && col === center) {
          GameData.path.push(tile)
        }
      }
    }

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          this.dragStartY = pointer.y
          this.containerStartY = this.contentContainer.y
    })

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        const deltaY = pointer.y - this.dragStartY
        const maxY = (rows + 4) * spacingY - GameData.screenHeight + bottomBarHeight
        this.contentContainer.y = this.containerStartY + deltaY

        this.contentContainer.y = Phaser.Math.Clamp(this.contentContainer.y, 0, maxY)
      }
    })

    EventBus.emit('current-scene-ready', this)

    this.input.on('pointerdown', () => {
      this.addNextHexTile()
    })
  }

  chooseNextPos(curX: number, curY: number) {
    const r = Math.random()
    if (r < 0.3 && curX - GameData.hexWidth * 0.75 >= GameData.minX) {
      return {x: curX - GameData.hexWidth * 0.75, y: curY - GameData.hexHeight * 0.5}
    }
    else if (r < 0.6 && curX + GameData.hexWidth * 0.75 <= GameData.maxX) {
      return {x: curX + GameData.hexWidth * 0.75, y: curY - GameData.hexHeight * 0.5}
    }
    else {
      return {x: curX, y: curY - GameData.hexHeight}
    }
  }

  addNextHexTile() {
    const lastTile = GameData.path[GameData.path.length - 1]
    const pos = this.chooseNextPos(lastTile.centerX, lastTile.centerY)
    const tile = new HexTile(this, pos.x, pos.y, GameData.hexSize, randomColor(), GameData.skew)
    this.add.existing(tile)
    GameData.path.push(tile)
    if (pos.y < GameData.screenHeight / 2) {
      shiftCamera(this, pos.y - lastTile.centerY);
    }
  }
}
