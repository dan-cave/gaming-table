import {
  MODULE_NAME,
  LARGE_BUTTONS_SETTING,
  BUTTON_SCALE_PX,
} from "../settings";

export default (enabled) => {
  if (enabled || game.settings.get(MODULE_NAME, LARGE_BUTTONS_SETTING)) {
    const buttonSize = game.settings.get(MODULE_NAME, BUTTON_SCALE_PX);
    const bigButtonsStyle = `#controls ol.control-tools { margin-top: 25vh !important; margin-left: ${
      buttonSize / 2
    }px; } #controls .control-tools .scene-control, #controls ol.control-tools > li { width: ${buttonSize}px; height: ${buttonSize}px; line-height: ${buttonSize}px; font-size: ${
      buttonSize * 0.56
    }px;}`;

    const style = document.createElement("style");
    style.setAttribute("id", "bigButtonsStyle");
    style.textContent = bigButtonsStyle;
    document.head.append(style);
  } else {
    let el = document.getElementById("bigButtonsStyle");
    if (el != null) {
      el.remove();
    }
  }
};
