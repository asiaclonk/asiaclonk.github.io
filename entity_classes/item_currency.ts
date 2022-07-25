import { CategoryText, NoteText , RarityText } from "../common/enum.js";
import { Item } from "./item.js";

/**
 * Item class specific for currencies.
 */
export class Currency extends Item {
    //#region Currency entries
    /** Basic currency. */
    static ID_0000_CopperCoin = new Currency(0, "Copper coin", "A common currency used for everyday bartering and guard distraction.", "", RarityText.Common);
    /** Basic gacha currency. */
    static ID_0001_CommonGachaCoupon = new Currency(1, "Adventurer coupon", "The guild has outsourced manpower to the tourism industry in one last attempt to stay above water but ultimately the relative peace upheld by the military spelled the guild's demise. As such the now jobless rookie adventurers are unable to obtain a much coveted travel permit with their meager supply of sidequests. Desperate individuals go so far as to pretend to recognize this antique coupon for a chance to get past border patrol and truly start their adventure.", "", RarityText.Common);
    //#endregion

    //#region Class definition
    /**
     * Creates a new currency entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity note of this item.
     */
    constructor (id: number, name?: string, lore?: string, icon?: string, rarityText?: string) {
        super(id, name, NoteText.Currency, lore, icon, rarityText, CategoryText.Currency, true, false, false);
    }
    //#endregion
}