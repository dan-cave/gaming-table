import { MODULE_NAME, LARGE_DOORS_SETTING } from "../settings";

const repositionOverride = function () {
  let pos = this.wall.midpoint.map(p => p - 30);
  this.position.set(...pos);
}

const drawOverride = function () {
  // Background
  this.bg = this.bg || this.addChild(new PIXI.Graphics());
  this.bg.clear().beginFill(0x000000, 1.0).drawRoundedRect(-2, -2, 64, 64, 5).endFill();
  this.bg.alpha = 0;

  // Control Icon
  this.icon = this.icon || this.addChild(new PIXI.Sprite());
  this.icon.width = this.icon.height = 60;
  this.icon.alpha = 0.6;
  this.icon.texture = this._getTexture();

  // Border
  this.border = this.border || this.addChild(new PIXI.Graphics());
  this.border.clear().lineStyle(1, 0xFF5500, 0.8).drawRoundedRect(-2, -2, 64, 64, 5).endFill();
  this.border.visible = false;

  // Add control interactivity
  this.eventMode = "static";
  this.interactiveChildren = false;
  this.hitArea = new PIXI.Rectangle(-2, -2, 64, 64);
  this.cursor = "pointer";

  // Set position
  this.reposition();
  this.alpha = 1.0;

  // Activate listeners
  this.removeAllListeners();
  this.on("pointerover", this._onMouseOver).on("pointerout", this._onMouseOut)
    .on("pointerdown", this._onMouseDown).on("rightdown", this._onRightDown);
  return this;
};

export default () => {
  if (game.settings.get(MODULE_NAME, LARGE_DOORS_SETTING)) {
    libWrapper.register(MODULE_NAME, 'DoorControl.prototype.draw', drawOverride, 'OVERRIDE');
    libWrapper.register(MODULE_NAME, 'DoorControl.prototype.reposition', repositionOverride, 'OVERRIDE');
  }
}