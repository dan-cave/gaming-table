import { MODULE_NAME } from "./constants";
import enlargeButtons from "../client-tools/enlargeButtonsTool";

export const LARGE_BUTTONS_SETTING = "largeButtons";

export const LARGE_DOORS_SETTING = "largeDoors";

export const CHARACTER_SHEET_SETTING = "characterSheet";

export const PULL_FOCUS_PLAYER = "player";
export const PULL_FOCUS_PAN_SPEED = "panspeed";
export const PULL_FOCUS_KEYBIND = "keybind";
export const PULL_FOCUS_INTERVAL_SPEED = "intervalspeed";

export const LONG_TOUCH_TIMEOUT = "longTouchTimeout";

export const LONG_TOUCH_TOGGLE = "longTouchToggle";

export const ZOOM_VALUE = "zoomValue";
export const ZOOM_PAN_TOGGLE = "zoomPanToggle";

export const BUTTON_SCALE_PX = "buttonScalepx";

export function registerSettings() {
  game.settings.register(MODULE_NAME, LARGE_BUTTONS_SETTING, {
    name: game.i18n.localize("gamingtable.settings.largeButtons.name"),
    hint: game.i18n.localize("gamingtable.settings.largeButtons.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (enabled) => enlargeButtons(enabled),
  });
  game.settings.register(MODULE_NAME, LARGE_DOORS_SETTING, {
    name: game.i18n.localize("gamingtable.settings.largeDoors.name"),
    hint: game.i18n.localize("gamingtable.settings.largeDoors.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(MODULE_NAME, CHARACTER_SHEET_SETTING, {
    name: game.i18n.localize("gamingtable.settings.characterSheets.name"),
    hint: game.i18n.localize("gamingtable.settings.characterSheets.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
  game.settings.register(MODULE_NAME, LONG_TOUCH_TOGGLE, {
    name: game.i18n.localize("gamingtable.settings.longTouchToggle.name"),
    hint: game.i18n.localize("gamingtable.settings.longTouchToggle.hint"),
    scope: "client",
    default: false,
    type: Boolean,
    config: true,
  });
  game.settings.register(MODULE_NAME, ZOOM_PAN_TOGGLE, {
    name: game.i18n.localize("gamingtable.settings.zoomPanToggle.name"),
    hint: game.i18n.localize("gamingtable.settings.zoomPanToggle.hint"),
    scope: "client",
    default: true,
    type: Boolean,
    config: true,
  });
  game.settings.register(MODULE_NAME, PULL_FOCUS_PLAYER, {
    name: game.i18n.localize("gamingtable.settings.pullFocusPlayer.name"),
    hint: game.i18n.localize("gamingtable.settings.pullFocusPlayer.hint"),
    scope: "world",
    default: "VTT",
    type: String,
    config: true,
  });
  game.settings.register(MODULE_NAME, PULL_FOCUS_PAN_SPEED, {
    name: game.i18n.localize("gamingtable.settings.pullFocusPanSpeed.name"),
    hint: game.i18n.localize("gamingtable.settings.pullFocusPanSpeed.hint"),
    scope: "world",
    default: 250,
    type: Number,
    config: true,
  });
  game.settings.register(MODULE_NAME, PULL_FOCUS_KEYBIND, {
    name: game.i18n.localize("gamingtable.settings.pullFocusKeyBind.name"),
    hint: game.i18n.localize("gamingtable.settings.pullFocusKeyBind.hint"),
    scope: "world",
    default: "t",
    type: window.Azzu.SettingsTypes.KeyBinding,
    config: true,
  });
  game.settings.register(MODULE_NAME, LONG_TOUCH_TIMEOUT, {
    name: game.i18n.localize("gamingtable.settings.longTouchTimeout.name"),
    hint: game.i18n.localize("gamingtable.settings.longTouchTimeout.hint"),
    scope: "world",
    default: 500,
    type: Number,
    config: true,
  });
  game.settings.register(MODULE_NAME, ZOOM_VALUE, {
    name: game.i18n.localize("gamingtable.settings.zoomValue.name"),
    hint: game.i18n.localize("gamingtable.settings.zoomValue.hint"),
    scope: "world",
    default: 0.5,
    type: Number,
    config: true,
  });
  game.settings.register(MODULE_NAME, BUTTON_SCALE_PX, {
    name: game.i18n.localize("gamingtable.settings.toolScale.name"),
    hint: game.i18n.localize("gamingtable.settings.toolScale.hint"),
    scope: "client",
    default: 100,
    type: Number,
    config: true,
  });
}
