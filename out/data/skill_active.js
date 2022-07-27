import { DataCollection } from "../common/base_classes.js";
import { ResultType, SkillTarget } from "../common/enum.js";
import { ActiveSkill } from "../entity_classes/skill_active.js";
import { FixedValueSkill } from "./skill_template.js";
export class Data_ActiveSkill {
}
/** Basic 6 damage skill. 10 cost. Front only. */
Data_ActiveSkill.ID_0000_InaccurateStrike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Inaccurate Strike", "Strike the frontmost enemy for 6 damage.", "A familiar move for many veteran adventurers, but hard to master for newcomers.", "", 5, [SkillTarget.EnemyFront], 0, 0, -1, 3);
/** Basic 6 damage skill. 10 cost. */
Data_ActiveSkill.ID_0001_Strike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Strike", "Strike any enemy for 6 damage.", "Practice and experience.", "", 8, [SkillTarget.EnemyAny], 0, 0, -1, 3);
/** The list of all active skills. */
Data_ActiveSkill.List = new DataCollection([
    Data_ActiveSkill.ID_0000_InaccurateStrike,
    Data_ActiveSkill.ID_0001_Strike
]);
//# sourceMappingURL=skill_active.js.map