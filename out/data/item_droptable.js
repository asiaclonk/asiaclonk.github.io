import { ItemDrop } from "../common/struct.js";
import { random_int, sum } from "../common/utility.js";
import { Material } from "./item_material.js";
/**
 * Grouping of items, dropweight and time to harvest.
 */
export class ItemDropTable {
    /**
     * Creates a new drop table.
     * @param drops The list of item drops in this table.
     * @param harvestTime The time in seconds it takes to roll a drop.
     */
    constructor(drops, harvestTime) {
        this.Drops = drops;
        this.HarvestTime = harvestTime;
    }
    /**
     * Rolls and returns an item drop.
     */
    roll() {
        var totalWeight = this.Drops.map(drop => drop.Weight).reduce(sum, 0);
        var random = random_int(1, totalWeight);
        for (let index = 0; index < this.Drops.length; index++) {
            random -= this.Drops[index].Weight;
            if (random <= 0)
                return this.Drops[index];
        }
    }
}
//#region Droptable entries
/** Just wood in a forest. */
ItemDropTable.ID_0000_ForestWood = new ItemDropTable([new ItemDrop(Material.ID_0000_Wood, 1, 1)], 10);
//# sourceMappingURL=item_droptable.js.map