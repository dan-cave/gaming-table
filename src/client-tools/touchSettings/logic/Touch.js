import FoundryCanvas from '../foundryvtt/FoundryCanvas'
import TouchContext from './TouchContext'
import Vectors from './Vectors'
import { idOf } from '../utils'

class Touch {
  constructor(event, touch, { context = TouchContext.PRIMARY_CLICK } = {}) {
    this.id = idOf(event)
    this.start = Object.freeze({ x: touch.clientX, y: touch.clientY })
    this.last = this.start
    this.current = this.last
    this.context = context
    this.clientX = touch.clientX
    this.clientY = touch.clientY
    this.screenX = touch.screenX
    this.screenY = touch.screenY
    this.target = event.target
    this.latestEvent = event

    this.world = FoundryCanvas.screenToWorld(this.current)  //< Position in the world where the user touched
    this.movementDistance = 0
    this.movement = Vectors.zero
  }

  get identifier() {
    return this.id
  }

  update(event, touch) {
    this.latestEvent = event
    this.last = this.current
    this.current = Object.freeze({ x: touch.clientX, y: touch.clientY })
    this.movementDistance += Vectors.distance(this.last, this.current)
    this.movement = Vectors.add(this.movement, Vectors.subtract(this.current, this.last))
  }
}

export default Touch
