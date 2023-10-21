import { MODULE_NAME } from "../../../settings";

// These hooks are here to prevent accidental panning when selecting a character to move, or when opening a door.
export default (canvasTouchToMouseAdapter) => {
  libWrapper.register(MODULE_NAME, 'Token.prototype.control', function (wrapped, ...args) {
    canvasTouchToMouseAdapter.clearTouchCount();
    return wrapped(...args);
  }, 'WRAPPER');

  libWrapper.register(MODULE_NAME, 'DoorControl.prototype._onMouseDown', function (wrapped, ...args) {
    canvasTouchToMouseAdapter.clearTouchCount();
    return wrapped(...args);
  }, 'WRAPPER');

  // This wrapper handles pings and toggling select/

  libWrapper.register(MODULE_NAME, 'SceneControls.prototype.activateListeners', function (wrapped, ...args) {
    Hooks.on(`${MODULE_NAME}.longTouch`, () => {
      if (ui.controls.activeControl !== "tokens") {
        canvas.tokens.activate();
      }
      if (ui.controls.activeTool === "select") {
        ui.controls.initialize({tool: "ruler" });
      } else {
        ui.controls.initialize({tool: "select" });
      }
    });
    return wrapped(...args);
  }, 'WRAPPER');

}