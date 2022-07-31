export class GUIElement {
    constructor(displayType = "flex") {
        this.Container = document.createElement("div");
        this.Container.className = "menu-content menu-content-kagurasuzu"; // TODO: themes
        this.Container.style.display = displayType;
    }
    show() {
        this.Container.style.display = "block";
    }
    hide() {
        this.Container.style.display = "hidden";
    }
}
//# sourceMappingURL=gui_element.js.map