import { DataCollection } from '../common/base_classes.js';
import { RarityText, CategoryText } from '../common/enum.js';
import { KeyItem } from '../entity_classes/item.js';

export class Data_KeyItem {
    /** Free roll starter kit. */
    static ID_0000_HelloWorld = new KeyItem(0, 'Hello World!', 'Common book', 'A worn brochure of the now defunct guild you picked up on the way. \'A whole new world is waiting to be explored!\' Advertisements for local shops and dungeon-seeing spots dot the pages. An attached coupon for an adventurer-for-hire catches your attention.', '', RarityText.Unique, CategoryText.Book, true);

    /** The list of all key items. */
    static KeyItems = new DataCollection<KeyItem>([
        Data_KeyItem.ID_0000_HelloWorld
    ]);
}