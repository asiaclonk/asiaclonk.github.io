import { DataTemplate } from '../common/base_classes.js';
/**
 * Class for defining a map with all its regions.
 */
export class GameMap extends DataTemplate {
    constructor(id, regions, walls, places, image, size, name, note, lore, icon) {
        super(id, name, note, lore, icon);
        this.Regions = regions;
        this.Walls = walls;
        this.Image = image;
        this.Size = size;
        this.Places = places;
    }
}
/**
 * Class for defining unique regions on a map.
 */
export class Region {
    constructor(danger, gold, speed, shape, xp) {
        this.Danger = danger;
        this.Gold = gold;
        this.Shape = shape;
        this.Speed = speed;
        this.XP = xp;
    }
}
/**
 * Base class for locations with player interactions.
 */
export class Place extends DataTemplate {
    constructor(id, coordinates, actions, image, name, note, lore, icon) {
        super(id, name, note, lore, icon);
        this.Actions = actions;
        this.Coordinates = coordinates;
        this.Image = image !== null && image !== void 0 ? image : './media/images/common/missing192x128.png';
    }
}
/**
 * A little class to provide UI for location menus.
 */
export class MapAction {
    constructor(text, icon, action) {
        this.Action = action;
        this.Icon = icon;
        this.Text = text;
    }
}
//# sourceMappingURL=map.js.map