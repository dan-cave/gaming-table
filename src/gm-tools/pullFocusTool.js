import {
  MODULE_NAME,
  PULL_FOCUS_KEYBIND,
  PULL_FOCUS_PAN_SPEED,
  PULL_FOCUS_PLAYER,
  SOCKET_MODULE_NAME,
} from "../settings/index";

const listen = () => {
  game.socket.on(SOCKET_MODULE_NAME, (data) => {
    if (game.scenes.viewed.data._id != data.scene_id) {
      return;
    }
    if (game.user.name == game.settings.get(MODULE_NAME, PULL_FOCUS_PLAYER)) {
      canvas.animatePan(data.pan);
    }
  });
};
const pullFocus = (viewPosition) => {
  let focusdata = {};
  focusdata.pan = viewPosition;
  focusdata.pan.duration = game.settings.get(MODULE_NAME, PULL_FOCUS_PAN_SPEED);
  focusdata.scene_id = game.scenes.viewed.data._id;
  game.socket.emit(SOCKET_MODULE_NAME, focusdata);
};

let overCanvas = true;

const keyDown = (e) => {
  const KeyBinding = window.Azzu.SettingsTypes.KeyBinding;
  const bind = KeyBinding.eventIsForBinding(
    e,
    KeyBinding.parse(game.settings.get(MODULE_NAME, PULL_FOCUS_KEYBIND)),
  );
  if (bind && overCanvas) {
    pullFocus(canvas.scene._viewPosition);
  }
};

export const init = () => {
  listen();
};

export const gmInit = () => {
  if (game.user.isGM) {
    window.addEventListener("keydown", keyDown);

    canvas.stage.on("mouseover", (e) => {
      overCanvas = true;
    });
    canvas.stage.on("mouseout", (e) => {
      overCanvas = false;
    });
  }
};
