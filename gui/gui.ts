
/**
 * Handles user input and menus.
 */
export class GUI {
    private _windowStack: HTMLElement[] = []



    addWindow(element: HTMLElement): void {
        element.style.zIndex = (100 + this._windowStack.length * 10).toString();
        this._windowStack.push(element)
    }
}