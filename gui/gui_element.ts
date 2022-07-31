export class GUIElement {
    Container: HTMLElement;

    constructor(displayType: string = "flex") {
        this.Container = document.createElement("div");
        this.Container.className = "menu-content menu-content-kagurasuzu"; // TODO: themes
        this.Container.style.display = displayType;
    }

    show(): void {
        this.Container.style.display = "block";
    }

    hide(): void {
        this.Container.style.display = "hidden";
    }
}