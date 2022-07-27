import { DataCollection } from "../common/base_classes.js";
import { CategoryText, NoteText, RarityText } from "../common/enum.js";
import { Item } from "./item.js";
/**
 * Item class specific for currencies.
 */
export class Material extends Item {
    //#region Class definition
    /**
     * Creates a new currency entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity note of this item.
     * @param defaultBuyValue The cost of this item to buy from shops if not explicitely set. Given in copper coins.
     * @param defaultSellValue The value of this item when sold to a shop if not explicitely set. Given in copper coins.
     */
    constructor(id, name, lore, icon, rarityText, defaultBuyValue, defaultSellValue) {
        super(id, name, NoteText.Material, lore, icon, rarityText, CategoryText.Material, true, true, false, defaultBuyValue, defaultSellValue);
    }
}
//#region Material entries
/** Basic material. */
Material.ID_0000_Wood = new Material(0, "Wood", "The next best thing after your bare hands.", "", RarityText.Common, 10, 5);
//#endregion
/** The list of all materials. */
Material.Materials = new DataCollection([
    Material.ID_0000_Wood
]);
//# sourceMappingURL=item_material.js.map