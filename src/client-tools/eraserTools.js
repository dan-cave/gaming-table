export function installDrawingToolsControls(menuStructure) {
  const category = menuStructure.find(c => c.name === 'drawings')
  if (category == null || !Array.isArray(category.tools)) return

  category.tools.push({
    // Simulate hitting del with a drawing selected
    name: 'Delete',
    title: 'GAMINGTABLE.DeleteDrawing',
    icon: 'fas fa-eraser',
    button: true,
    onClick: () => canvas.drawings._onDeleteKey()
  })
}

export function installMeasurementTemplateEraser(menuStructure) {
  const measurementCategory = menuStructure.find(c => c.name === 'measure')
  if (measurementCategory != null) {
    const clearIndex = measurementCategory.tools.findIndex(t => t.name === 'clear')
    if (clearIndex !== -1) {
      measurementCategory.tools.splice(clearIndex, 0, {
        name: 'erase',
        title: 'GAMINGTABLE.Erase',
        icon: 'fas fa-eraser'
      })
    }
  }
}