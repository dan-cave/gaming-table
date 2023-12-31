import {
  MODULE_NAME,
  LONG_TOUCH_TIMEOUT,
  LONG_TOUCH_TOGGLE,
  ZOOM_VALUE,
  ZOOM_PAN_TOGGLE,
} from "../../../settings";
import TouchToMouseAdapter from "./TouchToMouseAdapter";

class CanvasTouchToMouseAdapter extends TouchToMouseAdapter {
  constructor(canvas) {
    super(canvas);
    console.log(`Creating canvas mouse adapter for ${canvas}`);
    this.touchCount = 0;
    this.lastTouchTime = 0;
    this.inTimeout = false;
    this.timeoutTime = 300;
    this.longPressTimeout = null;
    this.longPressTimeoutTime =
      game.settings.get(MODULE_NAME, LONG_TOUCH_TIMEOUT) || 500;
    this.zoomValue = game.settings.get(MODULE_NAME, ZOOM_VALUE) || 0.25;
    this.zoomPanToggle = game.settings.get(MODULE_NAME, ZOOM_PAN_TOGGLE);
  }

  handleTouchEnd(event) {
    clearTimeout(this.longPressTimeout);
    this.touchCount++;
    if (!this.inTimeout) {
      this.inTimeout = true;
      setTimeout(() => {
        if (this.touchCount === 2) {
          this.pan();
        } else if (this.touchCount === 3) {
          if (this.zoomPanToggle === false) {
            this.zoom(1);
          } else {
            this.zoomPan(1);
          }
        } else if (this.touchCount >= 4) {
          if (this.zoomPanToggle === false) {
            this.zoom(-1);
          } else {
            this.zoomPan(-1);
          }
        }
        this.clearTouchCount();
        this.inTimeout = false;
      }, 750);
    }

    this.forwardTouches(event);
    this.cleanUpTouches(event);
  }

  handleTouchStart(event) {
    if (game.settings.get(MODULE_NAME, LONG_TOUCH_TOGGLE)) {
      this.longPressTimeout = setTimeout(() => {
        Hooks.call(`${MODULE_NAME}.longTouch`);
      }, this.longPressTimeoutTime);
    }

    this.updateActiveTouches(event);
    this.forwardTouches(event);
  }

  handleTouchMove(event) {
    if (canvas.mouseInteractionManager.isDragging || this.isDraggingPlaceableObjects()) {
      clearTimeout(this.longPressTimeout);
      this.clearTouchCount();
    }
    this.updateActiveTouches(event);
    this.forwardTouches(event);
  }

  pan() {
    let touch = canvas.mousePosition;
    touch.scale = canvas.stage.scale._x;
    touch.duration = 250;
    canvas.animatePan(touch);
  }

  zoomPan(sign) {
    let touch = canvas.mousePosition;
    touch.scale = canvas.stage.scale._x + sign * this.zoomValue;
    touch.duration = 250;
    canvas.animatePan(touch);
  }

  zoom(sign) {
    canvas.animatePan({scale: canvas.stage.scale._x + sign * this.zoomValue})
  }

  getEventMap() {
    return {
      // First simulate that the pointer moves to the specified location, then simulate the down event.
      // Foundry won't take the "click" on the first try otherwise.
      pointerdown: ["pointermove", "pointerdown"],
      pointermove: ["pointermove"],
      pointerup: ["pointerup"],
      pointercancel: ["pointercancel"],
    };
  }

  clearTouchCount() {
    this.touchCount = 0;
  }

  // Utility class to determine whether controlled PlaceableObjects have a DRAG (3) interaction state. 
  // Dragging PlaceableObjects does not update the mouseInteractionManager's internal state for some reason
  // Which is how I determine whether any other kind of drag event is happening
  isDraggingPlaceableObjects() {

    let isDragging = false;
    canvas.activeLayer.controlledObjects.forEach(placeableObject => {
      isDragging = isDragging || placeableObject.interactionState == canvas.mouseInteractionManager.states.DRAG;
    });
    return isDragging;
  }
}

CanvasTouchToMouseAdapter.init = function init(canvas) {
  return new CanvasTouchToMouseAdapter(canvas);
};

export default CanvasTouchToMouseAdapter;
