import { DataCollection } from '../common/base_classes.js';
import { CategoryText, RarityText } from '../common/enum.js';
import { Item } from './item.js';

/**
 * Item class specific for key items.
 */
export class KeyItem extends Item {
    //#region Key item entries
    /** Free roll starter kit. */
    static ID_0000_HelloWorld = new KeyItem(0, 'Hello World!', 'Common book', 'A worn brochure of the now defunct guild you picked up on the way. \'A whole new world is waiting to be explored!\' Advertisements for local shops and dungeon-seeing spots dot the pages. An attached coupon for an adventurer-for-hire catches your attention.', '', RarityText.Unique, CategoryText.Book, true);
    //#endregion

    /** The list of all key items. */
    static KeyItems = new DataCollection<KeyItem>([
        KeyItem.ID_0000_HelloWorld
    ]);

    //#region Class definition
    /**
     * Creates a new currency entry.
     * @param id The ID of this item.
     * @param name The name of this item.
     * @param note The note of this item.
     * @param lore The flavor text of this item.
     * @param icon The link to an image that represents this item.
     * @param rarityText The rarity note of this item.
     * @param categoryText The category note of this item.
     */
     constructor (id: number, name?: string, note?: string, lore?: string, icon?: string, rarityText?: string, categoryText?: string, usable?: boolean) {
        super(id, name, note, lore, icon, rarityText, categoryText, true, false, usable);
    }
    //#endregion
}