/**
 * Handles map interaction.
 */
export class GUIMap {
    static enableDrag() {
        var map = document.getElementById("map");
        map.onmousedown = dragMapStart;
        function dragMapStart(e) {
            if (e.target != map)
                return;
            e.preventDefault();
            let initX = e.clientX, initY = e.clientY;
            let initMapX = GUIMap._viewX, initMapY = GUIMap._viewY;
            document.onmouseup = dragWindowEnd;
            document.onmousemove = dragWindow;
            function dragWindow(e) {
                e.preventDefault();
                let diffX = initX - e.clientX;
                let diffY = initY - e.clientY;
                let left = Math.max(Math.min(initMapX + diffX, GUIMap._maxX - map.offsetWidth), 0);
                let top = Math.max(Math.min(initMapY + diffY, GUIMap._maxY - map.offsetHeight), 0);
                GUIMap._viewX = left;
                GUIMap._viewY = top;
                let bgX = -left % 1920;
                let bgY = -top % 1280;
                map.style.backgroundPosition = bgX + "px " + bgY + "px";
            }
            function dragWindowEnd(e) {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
    static setSize(x, y) {
        this._maxX = x;
        this._maxY = y;
    }
    static centerOn(x, y) {
    }
}
GUIMap._viewX = 0;
GUIMap._viewY = 0;
GUIMap._maxX = 0;
GUIMap._maxY = 0;
//# sourceMappingURL=map.js.map