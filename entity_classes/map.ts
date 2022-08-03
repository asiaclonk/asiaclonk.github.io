import { DataTemplate } from '../common/base_classes.js';
import { Point, Shape } from '../common/utility.js';

/**
 * Class for defining a map with all its regions.
 */
export class GameMap extends DataTemplate {
    /** The size of the map for GUI purposes. */
    Size: Point;
    /** List of regions in this map. */
    Regions: Region[];
    /** List of impassable areas in this map. */
    Walls: Shape[];
    /** List of places you can visit on this map. */
    Places: Place[];
    /** A link to the image of the map. */
    Image: string;

    constructor(id: number, regions: Region[], walls: Shape[], places: Place[], image: string, size: Point, name?: string, note?: string, lore?: string, icon?: string) {
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
    /** The strength requirement. */
    Danger: number;
    /** The gold gain per second. */
    Gold: number;
    /** The shape of the region. */
    Shape: Shape;
    /** The movespeed multiplier of this region. */
    Speed: number;
    /** The XP gain per second. */
    XP: number;

    constructor(danger: number, gold: number, speed: number, shape: Shape, xp: number) {
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
    /** Position of this location on the map. */
    Coordinates: Point;
    /** List of actions one can do on this location. */
    Actions: MapAction[];
    /** Link to a header image for this location. */
    Image: string;

    constructor(id: number, coordinates: Point, actions: MapAction[], image?: string, name?: string, note?: string, lore?: string, icon?: string) {
        super(id, name, note, lore, icon);
        this.Actions = actions;
        this.Coordinates = coordinates;
        this.Image = image ?? './media/images/common/missing192x128.png';
    }
}

/**
 * A little class to provide UI for location menus.
 */
export class MapAction {
    /** Button text for this action. */
    Text: string;
    /** Link to an icon to display in the button. */
    Icon: string;
    /** The function to execute on selection. */
    Action: Function;

    constructor(text: string, icon: string, action: Function) {
        this.Action = action;
        this.Icon = icon;
        this.Text = text;
    }
}