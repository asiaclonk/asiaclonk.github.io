import { GameMap, Place } from '../entity_classes/map.js';

/**
 * Handles map interaction.
 */
export class GUIMap {
    private static _viewX: number = 0;
    private static _viewY: number = 0;
    private static _maxX: number = 0;
    private static _maxY: number = 0;
    private static _viewport: HTMLElement;
    private static _content: HTMLElement;

    /** Initializer */
    static initialize(): void {
        this._content = document.getElementById('map-container');
        this._viewport = document.getElementById('map');
        this._viewport.onmousedown = dragMapStart;
        this._viewport.ontouchstart = dragMapStart;
        this._content.onmousemove = this.showCoords;
        this._content.ontouchmove = this.showCoords;
        new ResizeObserver(this.mapResize).observe(this._viewport);

        function dragMapStart(e: UIEvent): void {
            // Don't do anything if you aren't specifically dragging the map
            if (e.target != GUIMap._viewport && e.target != GUIMap._content && !GUIMap._content.contains(<Element>e.target))
                return;

            // Don't do anything if the map is entirely smaller than the current viewport
            let maxX = Math.max(0, GUIMap._maxX - GUIMap._viewport.clientWidth);
            let maxY = Math.max(0, GUIMap._maxY - GUIMap._viewport.clientHeight);
            if (maxX == 0 && maxY == 0)
                return;

            let initX = e.type === 'mousedown' ? (<MouseEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
            let initY = e.type === 'mousedown' ? (<MouseEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
            let initMapX = GUIMap._viewX, initMapY = GUIMap._viewY;

            document.onmouseup = dragMapEnd;
            document.onmousemove = dragMap;
            document.ontouchend = dragMapEnd;
            document.ontouchmove = dragMap;
    
            function dragMap(e: UIEvent): void {
                let newX = e.type === 'mousemove' ? (<MouseEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
                let newY = e.type === 'mousemove' ? (<MouseEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
                let diffX = initX - newX;
                let diffY = initY - newY;
                let left = Math.max(Math.min(initMapX + diffX, maxX), 0);
                let top = Math.max(Math.min(initMapY + diffY, maxY), 0);
                GUIMap.moveMap(left, top);
            }
        
            function dragMapEnd(): void {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchmove = null;
            }
        }
    }

    static showCoords(e: UIEvent) {
        let box = GUIMap._content.getBoundingClientRect();
        let newX = e.type === 'mousemove' ? (<MouseEvent>e).clientX : (<TouchEvent>e).targetTouches[0].pageX;
        let newY = e.type === 'mousemove' ? (<MouseEvent>e).clientY : (<TouchEvent>e).targetTouches[0].pageY;
        let label = document.getElementById('mouse-map');
        label.textContent = `X:${newX - box.left} Y:${newY - box.top}`;
    }

    static moveMap(x: number, y: number) {
        this._viewX = x;
        this._viewY = y;
        let bgX = -x % 1920;
        let bgY = -y % 1280;
        this._viewport.style.backgroundPosition = bgX + 'px ' + bgY + 'px';

        if (GUIMap._viewport.clientWidth < this._maxX)
            GUIMap._content.style.left = -x + 'px';
        if (GUIMap._viewport.clientHeight < this._maxY)
            GUIMap._content.style.top = -y + 'px';
    }

    static centerView(x: number, y: number) {

    }

    static setMap(map: GameMap, viewX?: number, viewY?: number) {
        this._maxX = map.Size.X;
        this._maxY = map.Size.Y;

        GUIMap._content.style.backgroundImage = `url('${map.Image}')`
        GUIMap._content.style.width = map.Size.X + 'px';
        GUIMap._content.style.height = map.Size.Y + 'px';

        GUIMap._content.replaceChildren();
        let places = this.createPlaces(map.Places);
        places.forEach(place => GUIMap._content.appendChild(place));

        this.mapResize();
        this.moveMap(viewX ?? 0, viewY ?? 0);
    }

    static mapResize() {
        GUIMap._content.style.left = Math.floor(Math.max(0, (GUIMap._viewport.offsetWidth - GUIMap._maxX) / 2)) + 'px';
        GUIMap._content.style.top = Math.floor(Math.max(0, (GUIMap._viewport.offsetHeight - GUIMap._maxY) / 2)) + 'px';
    }

    private static createPlaces(places: Place[]): Node[] {
        return places.map(place => {
            let node = document.createElement('div');
            node.style.backgroundImage = `url('${place.Icon}')`;
            node.style.left = (place.Coordinates.X - 32) + 'px';
            node.style.top = (place.Coordinates.Y - 32) + 'px';
            node.dataset.placeId = place.ID.toString();
            node.className = 'place-node transition';
            node.onclick = () => console.log('clicked');

            let placeText = document.createElement('span');
            placeText.className = 'place-text transition';
            placeText.textContent = place.Name;
            node.appendChild(placeText);

            return node;
        });
    }
}