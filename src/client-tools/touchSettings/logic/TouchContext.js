const MouseButton = Object.freeze({
  left: 0,
  right: 2
});


class TouchContext {
  constructor({ name, forwardingEvents = [], mouseButton = null, isFinal = true } = {}) {
    this.name = name
    this.forwardingEvents = forwardingEvents
    this.mouseButton = mouseButton
    this.isFinal = isFinal
  }

  forwardsEvent(event) {
    let eventType = event
    if (typeof event === 'object' && typeof event.type === 'string') {
      eventType = event.type
    }
    return this.forwardingEvents.indexOf(eventType) !== -1
  }
}

const ALL_EVENTS = [
  'pointerdown', 'pointermove', 'pointerup', 'pointercancel',
  'touchstart', 'touchmove', 'touchend', 'touchcancel'
];

const PRIMARY_CLICK = Object.freeze(new TouchContext({
  name: 'primary-click',
  forwardingEvents: ALL_EVENTS,
  mouseButton: MouseButton.left,
  isFinal: false,
}));


export default Object.freeze({
  PRIMARY_CLICK,
});
