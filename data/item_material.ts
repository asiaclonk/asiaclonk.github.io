import { CategoryText, Descriptions, RarityText } from "../common/enum.js";
import { Item } from "./item.js";

/**
 * Item class specific for currencies.
 */
export class Material extends Item {
    //#region
    /** Basic material. */
    static ID_0000_Wood = new Material(0, "Wood", "The next best thing after your bare hands.", "", RarityText.Common, 10, 5);
    //#endregion

    /**
     * Creates a new currency entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity description of this item.
     * @param defaultBuyValue The cost of this item to buy from shops if not explicitely set. Given in copper coins.
     * @param defaultSellValue The value of this item when sold to a shop if not explicitely set. Given in copper coins.
     */
    constructor (id: number, name?: string, lore?: string, icon?: string, rarityText?: string, defaultBuyValue?: number, defaultSellValue?: number) {
        super(id, name, Descriptions.Material, lore, icon, rarityText, CategoryText.Material, true, true, false, defaultBuyValue, defaultSellValue, 999999999, 1);
    }
}