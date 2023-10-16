import { MODULE_NAME } from "../../../settings";

// These hooks are here to prevent accidental panning when selecting a character to move, or when opening a door.

export default (canvasTouchToMouseAdapter) => {
  libWrapper.register(MODULE_NAME, 'Token.prototype.control', function (wrapped, ...args) {
    console.log('Token.prototype.control was called');
    canvasTouchToMouseAdapter.clearTouchCount();
    return wrapped(...args);
  }, 'WRAPPER');

  libWrapper.register(MODULE_NAME, 'DoorControl.prototype._onMouseDown', function (wrapped, ...args) {
    console.log('DoorControl.prototype._onMouseDown was called');
    canvasTouchToMouseAdapter.clearTouchCount();
    return wrapped(...args);
  }, 'WRAPPER');
}