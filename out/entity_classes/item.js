import { DataTemplate } from '../common/base_classes.js';
import { CategoryText, RarityText } from '../common/enum.js';
/** Base class for items that can be used, equipped and traded */
export class Item extends DataTemplate {
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
    constructor(id, name, note, lore, icon, rarityText, categoryText, global, sellable, usable, defaultBuyValue, defaultSellValue, activeSkills, passiveSkills) {
        super(id, name, note, lore, icon);
        this.RarityText = rarityText !== null && rarityText !== void 0 ? rarityText : RarityText.Common;
        this.CategoryText = categoryText !== null && categoryText !== void 0 ? categoryText : CategoryText.Material;
        this.Global = global !== null && global !== void 0 ? global : false;
        this.Sellable = sellable !== null && sellable !== void 0 ? sellable : true;
        this.Usable = usable !== null && usable !== void 0 ? usable : false;
        this.DefaultBuyValue = defaultBuyValue !== null && defaultBuyValue !== void 0 ? defaultBuyValue : 0;
        this.DefaultSellValue = defaultSellValue !== null && defaultSellValue !== void 0 ? defaultSellValue : 0;
        this.ActiveSkills = activeSkills !== null && activeSkills !== void 0 ? activeSkills : [];
        this.PassiveSkills = passiveSkills !== null && passiveSkills !== void 0 ? passiveSkills : [];
    }
}
//# sourceMappingURL=item.js.map