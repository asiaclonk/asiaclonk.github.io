import { DataCollection } from '../common/base_classes.js';
import { RarityText } from '../common/enum.js';
import { Material } from '../entity_classes/item.js';
export class Data_Material {
}
/** Basic material. */
Data_Material.ID_0000_Wood = new Material(0, 'Wood', 'The next best thing after your bare hands.', '', RarityText.Common, 10, 5);
/** The list of all materials. */
Data_Material.Materials = new DataCollection([
    Data_Material.ID_0000_Wood
]);
//# sourceMappingURL=item_material.js.map