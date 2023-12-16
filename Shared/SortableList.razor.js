export function init(id, component) {
    new Sortable(document.getElementById(id), { 
        animation: 200,
        forceFallback: true,
        onUpdate: (event) => {
            // Revert the DOM to match the .NET state
            event.item.remove();
            event.to.insertBefore(event.item, event.to.childNodes[event.oldIndex]);

            // Notify .NET to update its model and re-render
            component.invokeMethodAsync('Drop', event.oldDraggableIndex, event.newDraggableIndex);
        }
    });
}