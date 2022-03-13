import { DataCollection } from "../common/base_classes.js";
import { KeyItem } from "./item_key.js";
import { Material } from "./item_material.js";
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

    static KeyItems = new DataCollection<KeyItem>([
        KeyItem.ID_0000_HelloWorld
    ]);

    static Materials = new DataCollection<Material>([
        Material.ID_0000_Wood
    ]);
}