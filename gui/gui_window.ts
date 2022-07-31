import { GUIElement } from "./gui_element.js";

/**
 * Organizes windows.
 */
export class GUIManager {
    private static _windows: GUIWindow[] = [];
    private static readonly startIndex = 100;

    /**
     * Adds a window to be managed and shows it on the map.
     * @param window The new window.
     */
    static addWindow(window: GUIWindow): void {
        window.setPosition(32 * (this._windows.length + 1), 32 * (this._windows.length + 1) + document.getElementById("header").clientHeight);
        window.setIndex(this.startIndex + this._windows.length);
        this._windows.push(window);
        window.show();
    }

    /**
     * Removes a window from the map.
     * @param window The closed window.
     */
    static removeWindow(window: GUIWindow): void {
        let index = this._windows.indexOf(window);
        this._windows.splice(index, 1)[0].dispose();

        while (index < this._windows.length) {
            this._windows[index].setIndex(this.startIndex + index);
            index++;
        }
    }

    /**
     * Moves a window to the top, drawing it over the others.
     * @param window The window to be moved to the top.
     */
    static moveToTop(window: GUIWindow): void {
        let index = this._windows.indexOf(window);
        this._windows.push(this._windows.splice(index, 1)[0]);
        while (index < this._windows.length) {
            this._windows[index].setIndex(this.startIndex + index);
            index++;
        }
    }
}

/**
 * A window.
 */
export class GUIWindow {
    private _window: HTMLElement;
    private _button: HTMLElement;
    private _backendStack: GUIElement[] = [];
    private _width: number;
    private _height: number;

    constructor(title: string = "Sample text", width: number, height: number, firstTab: GUIElement) {
        this._window = document.createElement("div");
        this._window.className = "menu-body animate";
        this._window.style.width = width + "px";
        this._window.style.height = height + "px";
        this._width = width;
        this._height = height;
        this._window.onmousedown = (e) => { e.stopPropagation(); GUIManager.moveToTop(this); }
        this._window.ontouchstart = (e) => { e.stopPropagation(); GUIManager.moveToTop(this); }

        let header = document.createElement("div");
        header.className = "menu-header";
        this._window.appendChild(header);

        let headerStart = document.createElement("div");
        headerStart.className = "menu-header-start";
        header.appendChild(headerStart);

        let headerText = document.createElement("div");
        headerText.innerHTML = title;
        headerText.className = "menu-header-title";
        header.appendChild(headerText);

        this._button = document.createElement("button");
        this._button.className = "menu-close-button transition";
        this._button.onclick = () => GUIManager.removeWindow(this);
        header.appendChild(this._button);

        this.pushTab(firstTab);

        this.enableDrag(header, this._window, this._button);

        GUIManager.addWindow(this);
    }

    private enableDrag(header: HTMLElement, body: HTMLElement, button: HTMLElement): void {
        header.onmousedown = dragWindowStart;
        header.ontouchstart = dragWindowStart;

        function dragWindowStart(e: UIEvent): void {
            if (e.target == button)
                return;

            e.preventDefault();
            let initX = e.type === "mousedown" ? (<MouseEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
            let initY = e.type === "mousedown" ? (<MouseEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
            let initBodyX = body.offsetLeft, initBodyY = body.offsetTop;
            let headerHeight = document.getElementById("header").clientHeight;
            let right = document.getElementById("map").clientWidth;
            let bottom = document.getElementById("map").clientHeight + headerHeight;

            document.onmouseup = dragWindowEnd;
            document.onmousemove = dragWindow;
            document.ontouchend = dragWindowEnd;
            document.ontouchmove = dragWindow;
    
            function dragWindow(e: UIEvent): void {
                e.stopPropagation();
                let newX = e.type === "mousemove" ? (<DragEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
                let newY = e.type === "mousemove" ? (<DragEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
                let diffX = newX - initX;
                let diffY = newY - initY;
                let left = Math.max(Math.min(initBodyX + diffX, right - body.clientWidth), 0);
                let top = Math.max(Math.min(initBodyY + diffY, bottom - body.clientHeight), 0 + headerHeight);

                body.style.left = left + "px";
                body.style.top = top + "px";
            }
        
            function dragWindowEnd(): void {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
        }
    }

    pushTab(element: GUIElement): void {
        if (this._backendStack.length > 0)
            this._backendStack[-1].hide();

        this._backendStack.push(element);
        this._window.appendChild(element.Container);
    }

    popTab(): void {
        let element = this._backendStack.pop();
        element.hide();
        this._window.removeChild(element.Container);

        if (this._backendStack.length > 0)
            this._backendStack[-1].show();
    }

    show(): void {
        document.getElementById("map").appendChild(this._window);
        this._window.onanimationend = () => this.finishAnimation();
        this._window.classList.add("show");
    }

    hide(): void {
        this._window.onanimationend = () => this.finishAnimation();
        this._window.classList.add("hide");
    }

    dispose(): void {
        this._window.onanimationend = () => this.disposeInternal();
        this._window.onmousedown = null;
        this._button.onclick = null;
        this._window.classList.add("hide");
    }

    setIndex(index: number): void {
        this._window.style.zIndex = index.toString();
    }

    setPosition(left: number, top: number) {
        let headerHeight = document.getElementById("header").clientHeight;
        let right = document.getElementById("map").clientWidth;
        let bottom = document.getElementById("map").clientHeight + headerHeight;
        let boundLeft = Math.max(Math.min(left, right - this._width), 0);
        let boundTop = Math.max(Math.min(top, bottom - this._height), 0 + headerHeight);
        this._window.style.left = boundLeft + "px";
        this._window.style.top = boundTop + "px";
    }

    private finishAnimation(): void {
        this._window.onanimationend = null;
        this._window.classList.remove("show", "hide");
    }

    private disposeInternal(): void {
        this._window.onanimationend = null;
        document.getElementById("map").removeChild(this._window);
    }
}