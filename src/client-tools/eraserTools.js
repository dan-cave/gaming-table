import { MODULE_NAME } from "../settings";

export const initEraserTools = () => {
  libWrapper.register(
    MODULE_NAME,
    "TemplateLayer.layerOptions",
    function (...args) {
      return foundry.utils.mergeObject(PlaceablesLayer.layerOptions, {
        name: "templates",
        canDragCreate: true,
        rotatableObjects: true,
        controllableObjects: true,
        sortActiveTop: true, // TODO this needs to be removed
        zIndex: 50,
      });
    },
    "OVERRIDE",
  );
};

const eraseTemplates = () => {
  canvas.templates.controlAll();
  ClientKeybindings._onDelete();
};

const eraseDrawings = () => {
  const activeTool = ui.controls.activeTool;
  ui.controls.initialize({ tool: "select" });
  canvas.drawings.controlAll();
  ClientKeybindings._onDelete();
  ui.controls.initialize({ tool: activeTool });
};

export const installDrawingToolsControls = (menuStructure) => {
  const category = menuStructure.find((c) => c.name === "drawings");
  if (game.user.isGM || category == null || !Array.isArray(category.tools))
    return;
  category.tools.push({
    name: "Delete",
    title: game.i18n.localize("gamingtable.tools.eraseDrawing"),
    icon: "fas fa-eraser",
    button: true,
    onClick: () => eraseDrawings(),
  });
};

export const installMeasurementTemplateEraser = (menuStructure) => {
  if (game.user.isGM) return;

  const measurementCategory = menuStructure.find((c) => c.name === "measure");
  if (measurementCategory != null) {
    const clearIndex = measurementCategory.tools.findIndex(
      (t) => t.name === "clear",
    );
    if (clearIndex !== -1) {
      measurementCategory.tools.splice(clearIndex, 0, {
        name: "Delete",
        title: game.i18n.localize("gamingtable.tools.eraseTemplate"),
        icon: "fas fa-eraser",
        button: true,
        onClick: () => eraseTemplates(),
      });
    }
  }
};
