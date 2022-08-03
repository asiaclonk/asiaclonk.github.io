import { DataCollection } from '../common/base_classes.js';
import { RarityText } from '../common/enum';
import { Currency } from '../entity_classes/item.js';

export class Data_Currency {
    /** Basic currency. */
    static ID_0000_CopperCoin = new Currency(0, 'Copper coin', 'A common currency used for everyday bartering and guard distraction.', '', RarityText.Common);
    /** Basic gacha currency. */
    static ID_0001_CommonGachaCoupon = new Currency(1, 'Adventurer coupon', 'The guild has outsourced manpower to the tourism industry in one last attempt to stay above water but ultimately the relative peace upheld by the military spelled the guild\'s demise. As such the now jobless rookie adventurers are unable to obtain a much coveted travel permit with their meager supply of sidequests. Desperate individuals go so far as to pretend to recognize this antique coupon for a chance to get past border patrol and truly start their adventure.', '', RarityText.Common);

    /** The list of all passive skills. */
    static List = new DataCollection<Currency>([
        Data_Currency.ID_0000_CopperCoin,
        Data_Currency.ID_0001_CommonGachaCoupon
    ]);
}