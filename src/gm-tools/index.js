import { init, gmInit } from "./pullFocusTool";

export const initGmTools = () => {
  Hooks.on("ready", () => {
    init();
  });

  Hooks.on("canvasReady", () => {
    gmInit();
  });
};

export default initGmTools;
