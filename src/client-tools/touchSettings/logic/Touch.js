import TouchContext from "./TouchContext";
import { idOf } from "../utils";

class Touch {
  constructor(event, touch, { context = TouchContext.PRIMARY_CLICK } = {}) {
    this.id = idOf(event);
    this.start = Object.freeze({ x: touch.clientX, y: touch.clientY });
    this.last = this.start;
    this.current = this.last;
    this.context = context;
    this.clientX = touch.clientX;
    this.clientY = touch.clientY;
    this.screenX = touch.screenX;
    this.screenY = touch.screenY;
    this.target = event.target;
    this.latestEvent = event;

    this.world = canvas.stage.transform.worldTransform.applyInverse({
      x: this.current.x,
      y: this.current.y,
    }); //< Position in the world where the user touched
    this.movementDistance = 0;
    this.movement = { x: 0, y: 0 };
  }

  get identifier() {
    return this.id;
  }

  update(event, touch) {
    this.latestEvent = event;
    this.last = this.current;
    this.current = Object.freeze({ x: touch.clientX, y: touch.clientY });
    this.movementDistance += this.distance(this.last, this.current);
    this.movement = this.add(
      this.movement,
      this.subtract(this.current, this.last),
    );
  }

  add(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    };
  }

  subtract(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    };
  }

  distance(a, b) {
    const diff = this.subtract(a, b);
    return this.length(diff);
  }

  length(vector) {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
  }
}

export default Touch;
