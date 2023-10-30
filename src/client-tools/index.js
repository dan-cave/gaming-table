import { MODULE_NAME, MODULE_DISPLAY_NAME } from "../settings";
import initEnlargeButtonTool from "./enlargeButtonsTool";
import initEnlargeDoorsTool from './enlargeDoorsTool';
import initDisableCharacterSheets from './disableCharacterSheets';
import { installDrawingToolsControls, installMeasurementTemplateEraser, initEraserTools } from './eraserTools';
import { findCanvas, WindowHeaderTouchToMouseAdapter, CanvasTouchToMouseAdapter, CustomMouseInteractionManager, canvasCallbacks, initTouchWrapper, canvasTouchWrapper } from './touchSettings';

export const initClientTools = () => {
  Hooks.once('init', async () => {
    initDisableCharacterSheets();
    initEnlargeDoorsTool();
    initEnlargeButtonTool();
    initEraserTools();
    initTouchWrapper();
  });

  Hooks.on('getSceneControlButtons', (controls) => {
    installDrawingToolsControls(controls);
    installMeasurementTemplateEraser(controls);
  });

  Hooks.on('ready', function () {
    try {
      const canvasElement = findCanvas()
      if (canvasElement) {
        WindowHeaderTouchToMouseAdapter.init(document.body);
        const canvasTouchToMouseAdapter = CanvasTouchToMouseAdapter.init(canvasElement);
        canvasTouchWrapper(canvasTouchToMouseAdapter);
      } else {
        console.warn(`Failed to find canvas element. ${MODULE_DISPLAY_NAME} touch settings will not be available.`)
      }
    } catch (e) {
      console.error(`Failed to initialize ${MODULE_DISPLAY_NAME} touch settings: `, e)
    }
  });

  Hooks.on('canvasReady', function () {
    const callbacks = canvasCallbacks(canvas);
    const mgr = new CustomMouseInteractionManager(canvas.stage, canvas.stage, { clickRight2: false }, callbacks);

    canvas.mouseInteractionManager = mgr.activate();
  });

  Hooks.on(`${MODULE_NAME}.longTouch`, () => {
    if (ui.controls.activeControl !== "token") {
      canvas["tokens"].activate();
      ui.controls.initialize({tool: "select" });
    } else if (ui.controls.activeControl === "token" && ui.controls.activeTool === "select") {
      ui.controls.initialize({tool: "ruler" });
    } else {
      ui.controls.initialize({tool: "select" });
    }
  });
}

export default initClientTools;