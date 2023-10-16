import { MODULE_NAME } from './constants.js'
import enlargeButtons from '../client-tools/enlargeButtonsTool.js'

export const GESTURE_MODE_SETTING = "gestureMode"
export const GESTURE_MODE_COMBINED = "combined"
export const GESTURE_MODE_SPLIT = "split"

export const LARGE_BUTTONS_SETTING = "largeButtons"

export const PULL_FOCUS_PLAYER = "player";
export const PULL_FOCUS_PAN_SPEED = "panspeed";
export const PULL_FOCUS_KEYBIND = "keybind";
export const PULL_FOCUS_INTERVAL_SPEED = "intervalspeed"


export function registerSettings() {
  game.settings.register(MODULE_NAME, LARGE_BUTTONS_SETTING, {
    name: "Enlarge buttons in on-screen UI",
    hint: "Increases the size of menu bar buttons to make them easier to use with touch controls",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: enabled => enlargeButtons(enabled),
  })
  
  game.settings.register(MODULE_NAME, PULL_FOCUS_PLAYER, {
    name: "Gaming Table's Player Name",
    hint: "The user name of the player who's session is being displayed on the gaming table",
    scope: "world",
    default: "VTT",
    type: String,
    config: true
  });
  game.settings.register(MODULE_NAME, PULL_FOCUS_PAN_SPEED, {
    name: "Pan Duration (in MS)",
    hint: "How fast or slow to transition to focus point. (1000ms = 1 second)",
    scope: "world",
    default: 250,
    type: Number,
    config: true
  });
  game.settings.register(MODULE_NAME, PULL_FOCUS_KEYBIND, {
    name: "Keymap",
    hint: "Enter the keymap used to pull focus on the gaming table",
    scope: "world",
    default: "t",
    type: window.Azzu.SettingsTypes.KeyBinding,
    config: true
  });
}