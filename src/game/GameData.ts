import { HexTile } from "./TileData";

export const GameData = {
  skew: 0.6,
  path: [] as HexTile[],
  screenWidth: 0,
  screenHeight: 0,
  hexSize: 0,
  get hexWidth() {
    return this.hexSize * 2
  },
  get hexHeight() {
    return Math.sqrt(3) * this.hexSize * this.skew
  },
  get minX() {
    return this.hexWidth * 0.75
  },
  get maxX() {
    return this.screenWidth - this.hexWidth
  }
};