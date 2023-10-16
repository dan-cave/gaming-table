import Touch from './Touch'
import TouchContext from './TouchContext'
import { fakeTouchEvent } from './FakeTouchEvent'
import { idOf } from '../utils'

class TouchToMouseAdapter {
  constructor(element) {
    this.touches = {}

    const touchHandler = this.handleTouch.bind(this)
    for (const eventType of Object.keys(this.getEventMap())) {
      element.addEventListener(eventType, touchHandler, this.getEventListenerOptions())
    }
  }

  handleTouch(event) {
    if(!this.isTouchEvent(event)) {
      return
    }

    if (this.shouldHandleEvent(event)) {
      switch (event.type) {
        case 'pointerdown':
        case 'touchstart':
          this.handleTouchStart(event)
          break

        case 'pointermove':
        case 'touchmove':
          this.handleTouchMove(event)
          break

        case 'pointerup':
        case 'pointercancel':
          this.handleTouchEnd(event)
          break

        case 'touchend':
        case 'touchcancel':
          this.handleEndAll(event)
          break

        default:
          console.warn(`Unknown touch event type ${event.type}`)
          break
      }

      event.preventDefault()
    }
  }

  handleTouchStart(event) {
    this.updateActiveTouches(event)
    this.forwardTouches(event)
  }

  handleTouchMove(event) {
    this.updateActiveTouches(event)
    this.forwardTouches(event)
  }

  handleTouchEnd(event) {
    this.forwardTouches(event)
    this.cleanUpTouches(event)
  }

  handleEndAll(event) {
    for (const touch of Object.values(this.touches)) {
      this.forwardTouch(event, touch)
    }
    this.cleanUpAll()
  }

  forwardTouches(event) {
    const touchInstance = this.getTouch(idOf(event))
    if (touchInstance != null) {
      this.forwardTouch(event, touchInstance)
    } else {
      console.warn(`Found no touch instance for ID ${idOf(event)} while trying to forward a ${event.type}`, this.touches)
    }
  }

  forwardTouch(event, touch) {
    if (touch.context.forwardsEvent(event)) {
      fakeTouchEvent(
        event,
        touch,
        touch.context.mouseButton,
        this.getEventMap(),
        {
          target: this.getEventTarget(event),
        }
      )
    }
  }

  updateActiveTouches(event) {
    if (event.pointerId != null) {
      this.updateActiveTouch(event.pointerId, event, event, TouchContext.PRIMARY_CLICK)
    }
  }

  updateActiveTouch(id, event, touch, context) {
    if (this.touches[id] != null) {
      this.touches[id].update(event, touch)
    } else {
      this.touches[id] = new Touch(event, touch, { context })
    }
  }

  cleanUpAll() {
    Object.keys(this.touches).forEach(id => this.cleanUpTouch(id))
  }

  cleanUpTouches(event) {
    const id = idOf(event)
    return this.cleanUpTouch(id)
  }

  cleanUpTouch(id) {
    delete this.touches[id]
  }

  getEventMap() {
    return {
      pointerdown: ['pointerdown'],
      pointermove: ['pointermove'],
      pointerup: ['pointerup'],
      pointercancel: ['pointercancel'],
    }
  }

  getTouch(id) {
    return this.touches[id]
  }

  getEventListenerOptions() {
    return {
      capture: true,
      passive: false,
    }
  }

  getEventTarget() {
    return null // pick the same target as the original event
  }

  shouldHandleEvent() {
    return true
  }

  isTouchEvent(event) {
    return event.pointerType === "touch" || (typeof TouchEvent === "function" && event instanceof TouchEvent)
  }

  get touchIds() {
    return Object.keys(this.touches)
  }
}

TouchToMouseAdapter.init = function init(element) {
  return new TouchToMouseAdapter(element)
}

export default TouchToMouseAdapter
