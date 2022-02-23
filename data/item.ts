import { DataTemplate } from "../common/base_classes.js";
import { ActiveSkill } from "./skill_active.js";
import { PassiveSkill } from "./skill_passive.js";

/** Items that can be used, equipped and traded */
export class Item extends DataTemplate {
    //#region
    /** Basic material. */
    static ID_0000_Wood = new Item(0, "Wood", "A basic material.", "The next best thing after your bare hands.", "", 5, 2, [], []);
    //#endregion

    /** The cost of this item to buy from shops. */
    BuyValue: number;
    /** The value of this item when sold. */
    SellValue: number;
    /** The strength value gain from equipping this item. */
    Strength: number;
    /** The active skills gained from equipping this item. */
    ActiveSkills: ActiveSkill[];
    /** The passive skills gained from equipping this item. */
    PassiveSkills: PassiveSkill[];

    /**
     * Creates a new Item entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param description The description of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param buyValue The cost of this item to buy from shops.
     * @param sellValue The value of this item when sold.
     * @param activeSkills The active skills gained from equipping this item.
     * @param passiveSkills The passive skills gained from equipping this item.
     */
    constructor (id: number, name?: string, description?: string, lore?: string, icon?: string, buyValue?: number, sellValue?: number, activeSkills?: ActiveSkill[], passiveSkills?: PassiveSkill[]) {
        super(id, name, description, lore, icon);
        this.BuyValue = buyValue ?? 10;
        this.SellValue = sellValue ?? 10;
    }
}