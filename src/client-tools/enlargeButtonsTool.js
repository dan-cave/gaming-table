import { MODULE_NAME, LARGE_BUTTONS_SETTING } from '../settings';

const bigButtonsStyle = "#controls ol.control-tools { margin-top: 25vh !important; margin-left: 25px; } #controls .control-tools .scene-control, #controls ol.control-tools > li { width: 50px; height: 50px; line-height: 50px; font-size: 28px;}";

export default (enabled) => {
  if (enabled || game.settings.get(MODULE_NAME, LARGE_BUTTONS_SETTING)) {
    const style = document.createElement('style')
    style.setAttribute('id', "bigButtonsStyle");
    style.textContent = bigButtonsStyle
    document.head.append(style);
  } else {
    let el = document.getElementById('bigButtonsStyle');
    if (el != null) {
      el.remove();
    }
  }
}