import { CategoryText, Descriptions, RarityText } from "../common/enum.js";
import { Item } from "./item.js";

/**
 * Item class specific for currencies.
 */
export class Currency extends Item {
    //#region
    /** Basic currency. */
    static ID_0000_CopperCoin = new Currency(0, "Copper coin", "A common currency used for everyday bartering and guard distraction.", "", RarityText.Common);
    static ID_0001_CommonGachaCoupon = new Currency(1, "Adventurer coupon", "The guild has outsourced manpower to the tourism industry as a last resort. While the relative peace in the land has ultimately spelled the guild's demise, the now jobless rookie adventurers are still looking for wealth and glory beyond the borders. Your (very expensive) travel permit might just be their ticket.", "", RarityText.Common);
    //#endregion

    /**
     * Creates a new currency entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity description of this item.
     */
    constructor (id: number, name?: string, lore?: string, icon?: string, rarityText?: string) {
        super(id, name, Descriptions.Currency, lore, icon, rarityText, CategoryText.Currency, true, false, false, 1, 1, 999999999, 1);
    }
}