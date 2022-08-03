/**
 * Organizes windows.
 */
export class GUIManager {
    /**
     * Adds a window to be managed and shows it on the map.
     * @param window The new window.
     */
    static addWindow(window) {
        window.setPosition(32 * (this._windows.length + 1), 32 * (this._windows.length + 1));
        window.setIndex(this.startIndex + this._windows.length);
        this._windows.push(window);
        window.show();
    }
    /**
     * Removes a window from the map.
     * @param window The closed window.
     */
    static removeWindow(window) {
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
    static moveToTop(window) {
        let index = this._windows.indexOf(window);
        this._windows.push(this._windows.splice(index, 1)[0]);
        while (index < this._windows.length) {
            this._windows[index].setIndex(this.startIndex + index);
            index++;
        }
    }
}
GUIManager._windows = [];
GUIManager.startIndex = 100;
/**
 * A window.
 */
export class GUIWindow {
    constructor(title = 'Sample text', width, height, firstTab) {
        this._backendStack = [];
        this._window = document.createElement('div');
        this._window.className = 'menu-body animate';
        this._window.style.width = width + 'px';
        this._window.style.height = height + 'px';
        this._width = width;
        this._height = height;
        this._window.onmousedown = (e) => { e.stopPropagation(); GUIManager.moveToTop(this); };
        this._window.ontouchstart = (e) => { e.stopPropagation(); GUIManager.moveToTop(this); };
        let header = document.createElement('div');
        header.className = 'menu-header';
        this._window.appendChild(header);
        let headerStart = document.createElement('div');
        headerStart.className = 'menu-header-start';
        header.appendChild(headerStart);
        let headerText = document.createElement('div');
        headerText.innerHTML = title;
        headerText.className = 'menu-header-title';
        header.appendChild(headerText);
        this._button = document.createElement('button');
        this._button.className = 'menu-close-button transition';
        this._button.onclick = () => GUIManager.removeWindow(this);
        header.appendChild(this._button);
        this.pushTab(firstTab);
        this.enableDrag(header, this._window, this._button);
        document.getElementById('map').appendChild(this._window);
        GUIManager.addWindow(this);
    }
    enableDrag(header, body, button) {
        header.onmousedown = dragWindowStart;
        header.ontouchstart = dragWindowStart;
        function dragWindowStart(e) {
            if (e.target == button)
                return;
            e.preventDefault();
            let initX = e.type === 'mousedown' ? e.clientX : e.targetTouches[0].pageX;
            let initY = e.type === 'mousedown' ? e.clientY : e.targetTouches[0].pageY;
            let initBodyX = body.offsetLeft, initBodyY = body.offsetTop;
            let right = document.getElementById('map').clientWidth;
            let bottom = document.getElementById('map').clientHeight;
            document.onmouseup = dragWindowEnd;
            document.onmousemove = dragWindow;
            document.ontouchend = dragWindowEnd;
            document.ontouchmove = dragWindow;
            function dragWindow(e) {
                e.stopPropagation();
                let newX = e.type === 'mousemove' ? e.clientX : e.targetTouches[0].pageX;
                let newY = e.type === 'mousemove' ? e.clientY : e.targetTouches[0].pageY;
                let diffX = newX - initX;
                let diffY = newY - initY;
                let left = Math.max(Math.min(initBodyX + diffX, right - body.clientWidth), 0);
                let top = Math.max(Math.min(initBodyY + diffY, bottom - body.clientHeight), 0);
                body.style.left = left + 'px';
                body.style.top = top + 'px';
            }
            function dragWindowEnd() {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
        }
    }
    pushTab(element) {
        if (this._backendStack.length > 0)
            this._backendStack[-1].hide();
        this._backendStack.push(element);
        this._window.appendChild(element.Container);
    }
    popTab() {
        let element = this._backendStack.pop();
        element.hide();
        this._window.removeChild(element.Container);
        if (this._backendStack.length > 0)
            this._backendStack[-1].show();
    }
    show() {
        this._window.onanimationend = () => this.finishAnimation();
        this._window.classList.add('show');
    }
    hide() {
        this._window.onanimationend = () => this.finishAnimation();
        this._window.classList.add('hide');
    }
    dispose() {
        this._window.onanimationend = () => this.disposeInternal();
        this._window.onmousedown = null;
        this._button.onclick = null;
        this._window.classList.add('hide');
    }
    setIndex(index) {
        this._window.style.zIndex = index.toString();
    }
    setPosition(left, top) {
        let right = document.getElementById('map').clientWidth;
        let bottom = document.getElementById('map').clientHeight;
        let boundLeft = Math.max(Math.min(left, right - this._width), 0);
        let boundTop = Math.max(Math.min(top, bottom - this._height), 0);
        this._window.style.left = boundLeft + 'px';
        this._window.style.top = boundTop + 'px';
    }
    finishAnimation() {
        this._window.onanimationend = null;
        this._window.classList.remove('show', 'hide');
    }
    disposeInternal() {
        this._window.onanimationend = null;
        document.getElementById('map').removeChild(this._window);
    }
}
//# sourceMappingURL=gui_window.js.map