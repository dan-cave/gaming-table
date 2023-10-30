import { CHARACTER_SHEET_SETTING, MODULE_NAME } from "../settings";

export default () => {
  if (game.settings.get(MODULE_NAME, CHARACTER_SHEET_SETTING)) {
    libWrapper.register(
      MODULE_NAME,
      "Token.prototype._onClickLeft2",
      () => {},
      "OVERRIDE",
    );
  }
};
