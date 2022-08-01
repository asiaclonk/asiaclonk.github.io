/**
 * Handles map interaction.
 */
export class GUIMap {
    private static _viewX: number = 0;
    private static _viewY: number = 0;
    private static _maxX: number = 0;
    private static _maxY: number = 0;

    static enableDrag(): void {
        var map = document.getElementById('map');
        map.onmousedown = dragMapStart;
        map.ontouchstart = dragMapStart;

        function dragMapStart(e: UIEvent): void {
            if (e.target != map)
                return;

            e.preventDefault();
            let initX = e.type === 'mousedown' ? (<MouseEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
            let initY = e.type === 'mousedown' ? (<MouseEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
            let initMapX = GUIMap._viewX, initMapY = GUIMap._viewY;

            document.onmouseup = dragMapEnd;
            document.onmousemove = dragMap;
            document.ontouchend = dragMapEnd;
            document.ontouchmove = dragMap;
    
            function dragMap(e: UIEvent): void {
                let newX = e.type === 'mousemove' ? (<DragEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
                let newY = e.type === 'mousemove' ? (<DragEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
                let diffX = initX - newX;
                let diffY = initY - newY;
                let left = Math.max(Math.min(initMapX + diffX, GUIMap._maxX - map.offsetWidth), 0);
                let top = Math.max(Math.min(initMapY + diffY, GUIMap._maxY - map.offsetHeight), 0);
                this.MoveMap(top, left);
            }
        
            function dragMapEnd(): void {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
        }
    }

    private static MoveMap(x: number, y: number) {
        GUIMap._viewX = x;
        GUIMap._viewY = y;
        let bgX = -x % 1920;
        let bgY = -y % 1280;
        document.getElementById('map').style.backgroundPosition = bgX + 'px ' + bgY + 'px';
    }

    static setSize(x: number, y: number) {
        this._maxX = x;
        this._maxY = y;
    }

    static centerOn(x: number, y: number) {

    }
}