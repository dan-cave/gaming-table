import { MODULE_DISPLAY_NAME } from "../settings";
import initEnlargeButtonTool from "./enlargeButtonsTool";
import initEnlargeDoorsTool from './enlargeDoorsTool';
import { installDrawingToolsControls, installMeasurementTemplateEraser } from './eraserTools';
import { findCanvas, WindowHeaderTouchToMouseAdapter, CanvasTouchToMouseAdapter, touchHooks } from './touchSettings';

export const initClientTools = () => {
  Hooks.once('init', async () => {
    initEnlargeDoorsTool();
    await initEnlargeButtonTool();
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
        touchHooks(canvasTouchToMouseAdapter);
      } else {
        console.warn(`Failed to find canvas element. ${MODULE_DISPLAY_NAME} touch settings will not be available.`)
      }
    } catch (e) {
      console.error(`Failed to initialize ${MODULE_DISPLAY_NAME} touch settings: `, e)
    }
  })
  
};

export default initClientTools;