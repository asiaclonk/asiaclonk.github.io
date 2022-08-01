/**
 * Handles map interaction.
 */
export class GUIMap {
    static enableDrag() {
        var map = document.getElementById('map');
        map.onmousedown = dragMapStart;
        map.ontouchstart = dragMapStart;
        function dragMapStart(e) {
            if (e.target != map)
                return;
            e.preventDefault();
            let initX = e.type === 'mousedown' ? e.clientX : e.targetTouches[0].pageX;
            let initY = e.type === 'mousedown' ? e.clientY : e.targetTouches[0].pageY;
            let initMapX = GUIMap._viewX, initMapY = GUIMap._viewY;
            document.onmouseup = dragMapEnd;
            document.onmousemove = dragMap;
            document.ontouchend = dragMapEnd;
            document.ontouchmove = dragMap;
            function dragMap(e) {
                let newX = e.type === 'mousemove' ? e.clientX : e.targetTouches[0].pageX;
                let newY = e.type === 'mousemove' ? e.clientY : e.targetTouches[0].pageY;
                let diffX = initX - newX;
                let diffY = initY - newY;
                let left = Math.max(Math.min(initMapX + diffX, GUIMap._maxX - map.offsetWidth), 0);
                let top = Math.max(Math.min(initMapY + diffY, GUIMap._maxY - map.offsetHeight), 0);
                this.MoveMap(top, left);
            }
            function dragMapEnd() {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
        }
    }
    static MoveMap(x, y) {
        GUIMap._viewX = x;
        GUIMap._viewY = y;
        let bgX = -x % 1920;
        let bgY = -y % 1280;
        document.getElementById('map').style.backgroundPosition = bgX + 'px ' + bgY + 'px';
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