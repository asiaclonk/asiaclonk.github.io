/**
 * Handles map interaction.
 */
export class GUIMap {
    private static _viewX: number = 0;
    private static _viewY: number = 0;
    private static _maxX: number = 0;
    private static _maxY: number = 0;

    static enableDrag(): void {
        var map = document.getElementById("map");
        map.onmousedown = dragMapStart;

        function dragMapStart(e: MouseEvent): void {
            if (e.target != map)
                return;

            e.preventDefault();
            let initX = e.clientX, initY = e.clientY;
            let initMapX = GUIMap._viewX, initMapY = GUIMap._viewY;

            document.onmouseup = dragWindowEnd;
            document.onmousemove = dragWindow;
    
            function dragWindow(e: DragEvent): void {
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
        
            function dragWindowEnd(e: MouseEvent): void {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }

    static setSize(x: number, y: number) {
        this._maxX = x;
        this._maxY = y;
    }

    static centerOn(x: number, y: number) {

    }
}