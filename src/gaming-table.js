import Hammer from 'hammerjs';

import '../style/gaming-table.css';

function setupTouchTweaks() {
  const ZOOM_SPEED = 2
  const PAN_SPEED = 4
  const screen = document.querySelector('canvas#board')

  const hammer = new Hammer(screen)
  const pinch = hammer.get('pinch').set({ enable: true })
  const pan = hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, pointers: 2, threshold: 0 })
  pinch.recognizeWith(pan)

  hammer.on('pinchstart', getBaseScale)
  hammer.on('pan', panHandler)
  hammer.on('pinch', pinchHandler)

  let base_scale
  function getBaseScale(ev) {
    base_scale = canvas.stage.scale.x
  }

  function pinchHandler(ev) {
    // foundry doesn't 
    canvas.controls.select.active = false
    canvas.pan({
      scale: base_scale * Math.pow(ev.scale, 1 / ZOOM_SPEED)
    })
  }
  function panHandler(ev) {
    canvas.controls.select.active = false 
    canvas.pan({
      x: canvas.stage.pivot.x - (ev.velocityX * PAN_SPEED) / canvas.stage.scale.x,
      y: canvas.stage.pivot.y - (ev.velocityY * PAN_SPEED) / canvas.stage.scale.x
    })
  }

  // Foundry doesn't feed touch-based pointerup events back to the token
  // so we have to do it manually
  canvas.tokens.addEventListener('pointerup', (e) => {
    canvas.tokens.children.forEach((c) => {
      c.children.forEach((t) => {
        if (t.interactionState) t.dispatchEvent(e)
      })
    })
  })
}

Hooks.on('ready', () => {
  setupTouchTweaks();
});