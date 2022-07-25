import { DataTemplate } from "../common/base_classes.js";
import { CategoryText, RarityText } from "../common/enum.js";
import { ActiveSkill } from "./skill_active.js";
import { PassiveSkill } from "./skill_passive.js";

/** Base class for items that can be used, equipped and traded */
export class Item extends DataTemplate {
    /** The rarity note of this item. */
    RarityText: string;
    /** The category note of this item. */
    CategoryText: string;
    /** Determines if this is a global item that doesn't take up inventory slots and is instead stored in the player inventory. */
    Global: boolean;
    /** Determines if this is an item that can be sold in regular shops. */
    Sellable: boolean;
    /** Determines if this item should display a use button in the UI. */
    Usable: boolean;
    /** The cost of this item to buy from shops if not explicitely set. Given in copper coins. */
    DefaultBuyValue: number;
    /** The value of this item when sold to a shop if not explicitely set. Given in copper coins. */
    DefaultSellValue: number;
    /** The strength value gain from equipping this item. */
    Strength: number;
    /** The active skills gained from equipping this item. */
    ActiveSkills: ActiveSkill[];
    /** The passive skills gained from equipping this item. */
    PassiveSkills: PassiveSkill[];

    /**
     * Creates a new item entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param note The Note of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity note of this item.
     * @param categoryText The category note of this item.
     * @param global Determines if this is a global item that doesn't take up inventory slots and is instead stored in the player inventory.
     * @param sellable Determines if this is an item that can be sold in regular shops.
     * @param usable Determines if this item should display a use button in the UI.
     * @param defaultBuyValue The cost of this item to buy from shops if not explicitely set. Given in copper coins.
     * @param defaultSellValue The value of this item when sold to a shop if not explicitely set. Given in copper coins.
     * @param activeSkills The active skills gained from equipping this item.
     * @param passiveSkills The passive skills gained from equipping this item.
     */
    constructor (id: number, name?: string, note?: string, lore?: string, icon?: string, rarityText?: string, categoryText?: string, global?: boolean, sellable?: boolean, usable?: boolean, defaultBuyValue?: number, defaultSellValue?: number, activeSkills?: ActiveSkill[], passiveSkills?: PassiveSkill[]) {
        super(id, name, note, lore, icon);
        this.RarityText = rarityText ?? RarityText.Common;
        this.CategoryText = categoryText ?? CategoryText.Material;
        this.Global = global ?? false;
        this.Sellable = sellable ?? true;
        this.Usable = usable ?? false;
        this.DefaultBuyValue = defaultBuyValue ?? 0;
        this.DefaultSellValue = defaultSellValue ?? 0;
        this.ActiveSkills = activeSkills ?? [];
        this.PassiveSkills = passiveSkills ?? [];
    }
}