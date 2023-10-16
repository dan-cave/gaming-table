import TouchToMouseAdapter from './TouchToMouseAdapter'
import Vectors from './Vectors'

class CanvasTouchToMouseAdapter extends TouchToMouseAdapter {
  constructor(canvas) {
    super(canvas);
    this.touchCount = 0;
    this.lastTouchTime = 0;
    this.inTimeout = false;
    this.timeoutTime = 300;
  }
  
  handleTouchEnd(event) {
    this.touchCount++;
    if (!this.inTimeout) {
      this.inTimeout = true;
      setTimeout(() => {
        if (this.touchCount === 2) {
          this.pan();
        } else if (this.touchCount === 3) {
          this.zoomPan(1);
        } else if (this.touchCount >= 4) {
          this.zoomPan(-1);
        }
        this.clearTouchCount();
        this.inTimeout = false;
      }, 750);
    }

    this.forwardTouches(event);
    this.cleanUpTouches(event);
  }

  handleTouchMove(event) {
    this.clearTouchCount();

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
      touch.scale = canvas.stage.scale._x + sign * 0.25;
      touch.duration = 250;
			canvas.animatePan(touch);
  }

  getEventMap() {
    return {
      // First simulate that the pointer moves to the specified location, then simulate the down event.
      // Foundry won't take the "click" on the first try otherwise.
      pointerdown: ['pointermove', 'pointerdown'],
      pointermove: ['pointermove'],
      pointerup: ['pointerup'],
      pointercancel: ['pointercancel'],
    }
  }

  clearTouchCount() {
    this.touchCount = 0;
  }
}

CanvasTouchToMouseAdapter.init = function init(canvas) {
  return new CanvasTouchToMouseAdapter(canvas)
}

export default CanvasTouchToMouseAdapter