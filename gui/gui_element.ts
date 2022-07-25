export class GUIElement {
    protected _container: HTMLElement;

    constructor() {
        this._container = document.createElement("div");
        this._container.className = "animate menu"
    }

    show(): void {
        this._container.classList.add("a-appear");
    }

    dispose(): void {
        this._container.classList.remove("a-appear");
        this._container.classList.add("a-disappear");
    }
}