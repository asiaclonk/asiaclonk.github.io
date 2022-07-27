/**
 * Organizes windows.
 */
export class GUIWindow {
    private _window: HTMLElement;
    private _header: HTMLElement;
    private _windowStack: HTMLElement[] = [];

    set Header(title: string) {
        this._header.innerHTML = title;
    }

    constructor(title: string = "Sample text") {
        this._window = document.createElement("div");
        this._window.className = "animate menu-body";

        this._header = document.createElement("div");
        this._header.className = "menu-header";
        this._header.innerHTML = title;
    }

    pushTab(element: HTMLElement): void {
        if (this._windowStack.length > 0)
            this._windowStack.slice(-1)[0].classList.remove("menu-show");

        this._windowStack.push(element);
        document.getElementById("#map").appendChild(element);
        element.style.display = "hidden";
    }

    popTab(): void {
        let element = this._windowStack.pop();
        element.style.display = "hidden";

        if (this._windowStack.length > 0)
            this._windowStack.slice(-1)[0].style.display = "block";
    }

    dispose(): void {
        this._window.ontransitionend = this.dispose_internal;
        this._window.classList.remove("menu-show");
    }

    private dispose_internal(): void {
        this._window.ontransitionend = null;
        document.getElementById("map").removeChild(this._window);
    }
}