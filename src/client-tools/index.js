import { MODULE_NAME, MODULE_DISPLAY_NAME } from "../settings";
import initEnlargeButtonTool from "./enlargeButtonsTool";
import initEnlargeDoorsTool from './enlargeDoorsTool';
import initDisableCharacterSheets from './disableCharacterSheets';
import { installDrawingToolsControls, installMeasurementTemplateEraser, initEraserTools } from './eraserTools';
import { findCanvas, WindowHeaderTouchToMouseAdapter, CanvasTouchToMouseAdapter, touchWrappers } from './touchSettings';

export const initClientTools = () => {
  Hooks.once('init', async () => {
    initDisableCharacterSheets();
    initEnlargeDoorsTool();
    initEnlargeButtonTool();
    initEraserTools();
  });

  Hooks.on('getSceneControlButtons', (controls) => {
    installDrawingToolsControls(controls);
    installMeasurementTemplateEraser(controls);
  });

  Hooks.on('ready', function () {
    try {
      const canvas = findCanvas()
      if (canvas) {
        const canvasTouchToMouseAdapter = CanvasTouchToMouseAdapter.init(canvas);
        WindowHeaderTouchToMouseAdapter.init(document.body);
        touchWrappers(canvasTouchToMouseAdapter);
      } else {
        console.warn(`Failed to find canvas element. ${MODULE_DISPLAY_NAME} touch settings will not be available.`)
      }
    } catch (e) {
      console.error(`Failed to initialize ${MODULE_DISPLAY_NAME} touch settings: `, e)
    }
  })

  Hooks.on(`${MODULE_NAME}.longTouch`, () => {
    if (ui.controls.activeControl !== "tokens") {
      canvas["tokens"].activate();
    }
    if (ui.controls.activeTool === "select") {
      ui.controls.initialize({tool: "ruler" });
    } else {
      ui.controls.initialize({tool: "select" });
    }
  });
}

export default initClientTools;