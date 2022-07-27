import { DataCollection } from "../common/base_classes.js";
import { ResultType } from "../common/enum.js";
import { PassiveSkill } from "../entity_classes/skill_passive.js";
import { FixedValueCombatPassive } from "./skill_template.js";

export class Data_PassiveSkill {
    /** Basic 2 block passive */
    static ID_0000_FlimsyArmor = new PassiveSkill(0, new FixedValueCombatPassive(2, ResultType.Block), "Flimsy armor", "Block 2 damage every turn.", 0, -1);

    /** The list of all passive skills. */
    static List = new DataCollection<PassiveSkill>([
        Data_PassiveSkill.ID_0000_FlimsyArmor
    ]);
}