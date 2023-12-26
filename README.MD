# Blazor Sortable

An implementation of the [SortableJS library](https://sortablejs.github.io/Sortable/) for Blazor. This example shows you how to reorder elements within a list using drag and drop.

[View Demos](https://mango-flower-090e9130f.4.azurestaticapps.net/)

## Prerequisites

- [dotnet 7](https://dotnet.microsoft.com/download/dotnet/7.0)

## Running Locally

1. Clone this repository.
1. Run the project using `dotnet watch`.

## How to use it in your own project

1. Add SortableJS to your `index.html` file. You can either download from the [SortableJS website](https://sortablejs.github.io/Sortable/) or use a CDN...

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.13.0/Sortable.min.js"></script>

1. Add the `SortableList.razor`, `SortableList.razor.css` and `SortableList.razor.js` files to your project.
1. Add the SortableList component to your page and define the SortableItemTemplate...

        <SortableList Id="sortable" Items="items" OnUpdate="@SortList" Context="item">
            <SortableItemTemplate>
                <div>
                    <p>@item.Name</p>
                </div>
            </SortableItemTemplate>
        </SortableList>

- Items: The list of items to be displayed. Can be of any type.
- OnUpdate: The method to be called when the list is updated.
- Context: The name of the variable to be used in the template.

The SortableItemTemplate can contain any markup or components that you want.

## API

### Properties

Group (Optional): Used for dragging between lists. Set the group to the same value on both lists to enable.

Handle (Optional): The CSS class you want the sortable to respect as the drag handle. 

### Methods

OnUpdate: The method to be called when the list is updated. You can name this method whatever you like, but it expects a `oldIndex` and `newIndex` parameters when the drag and drop occurs.

OnRemove: The method to be called when an item is removed from a list. This method is useful for handling the drop even between multiple lists. Like `OnUpdate`, it expects `oldIndex` and `newIndex` parameters.

Here is an example of how to reorder your list when the OnUpdate is fired...

    private void SortList((int oldIndex, int newIndex) indices)
    {
        var (oldIndex, newIndex) = indices;

        var items = this.items;
        var itemToMove = items[oldIndex];
        items.RemoveAt(oldIndex);

        if (newIndex < items.Count)
        {
            items.Insert(newIndex, itemToMove);
        }
        else
        {
            items.Add(itemToMove);
        }

        StateHasChanged();
    }
