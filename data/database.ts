import { DataCollection } from "../common/base_classes.js";
import { ActiveSkill } from "./skill_active.js";
import { PassiveSkill } from "./skill_passive.js";
import { VTuber } from "./vtuber.js";

export class Database {
    static VTubers = new DataCollection<VTuber>([
        VTuber.ID_0000_KaguraSuzu,
        VTuber.ID_0001_MokotaMememe
    ]);
    static ActiveSkills = new DataCollection<ActiveSkill>([
        ActiveSkill.ID_0000_InaccurateStrike
    ]);
    static PassiveSkills = new DataCollection<PassiveSkill>([
        PassiveSkill.ID_0000_FlimsyArmor
    ]);
}