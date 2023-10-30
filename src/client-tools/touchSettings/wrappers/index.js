import { MODULE_NAME } from "../../../settings";
import CustomMouseInteractionManager from "../logic/CustomMouseInteractionManager";


// These hooks are here to prevent accidental panning when opening a door.
export const canvasTouchWrapper = (canvasTouchToMouseAdapter) => {

  libWrapper.register(MODULE_NAME, 'DoorControl.prototype._onMouseDown', function (wrapped, ...args) {
    canvasTouchToMouseAdapter.clearTouchCount();
    return wrapped(...args);
  }, 'WRAPPER');
};

export const initTouchWrapper = () => {
  // This hack should click the double clicking problem introduced in foundry 11.
  // From what I can tell, when a pointerdown event is triggered with the "touch" pointerType,
  // PixiJS emits a downstream pointerdown - mouse and also pointerdown - touch event. I'm not sure
  // What their reasoning is for doing that, but it is what it is. Because of that nonsense I needed
  // to create my OWN custom mouse interaction manager to ignore the extraneous touch event. Nasty stuff...

  libWrapper.register(MODULE_NAME, 'PlaceableObject.prototype._createInteractionManager', function (...args) {
    // Handle permissions to perform various actions
    const permissions = {
      hoverIn: this._canHover,
      clickLeft: this._canControl,
      clickLeft2: this._canView,
      clickRight: this._canHUD,
      clickRight2: this._canConfigure,
      dragStart: this._canDrag
    };

    // Define callback functions for each workflow step
    const callbacks = {
      hoverIn: this._onHoverIn,
      hoverOut: this._onHoverOut,
      clickLeft: this._onClickLeft,
      clickLeft2: this._onClickLeft2,
      clickRight: this._onClickRight,
      clickRight2: this._onClickRight2,
      dragLeftStart: this._onDragLeftStart,
      dragLeftMove: this._onDragLeftMove,
      dragLeftDrop: this._onDragLeftDrop,
      dragLeftCancel: this._onDragLeftCancel,
      dragRightStart: null,
      dragRightMove: null,
      dragRightDrop: null,
      dragRightCancel: null,
      longPress: this._onLongPress
    };

    // Define options
    const options = { target: this.controlIcon ? "controlIcon" : null };

    // Create the interaction manager
    return new CustomMouseInteractionManager(this, canvas.stage, permissions, callbacks, options);
  }, 'OVERRIDE');
};
