export const idOf = (event) => {
  if (event.pointerId != null) {
    return event.pointerId;
  } else if (event.touches != null && event.touches.length > 0) {
    return event.touches[0].identifier;
  } else {
    return null;
  }
};

export const cloneObject = (obj) => {
  obj = obj && obj instanceof Object ? obj : "";

  // Handle Date (return new Date object with old value)
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle Array (return a full slice of the array)
  if (obj instanceof Array) {
    return obj.slice();
  }

  // Handle Object
  if (obj instanceof Object) {
    const copy = Object.create(obj.constructor.prototype);
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (obj[attr] instanceof Object) {
          copy[attr] = cloneObject(obj[attr]);
        } else {
          copy[attr] = obj[attr];
        }
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

export const findCanvas = () => {
  return (
    document.querySelector("canvas#board") ||
    document.querySelector("body > canvas") ||
    document.querySelector("canvas")
  );
};
