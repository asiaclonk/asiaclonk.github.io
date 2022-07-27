import { DataCollection } from "../common/base_classes.js";
import { SkillLevelRequirement } from "../common/struct.js";
import { VTuber } from "../entity_classes/vtuber.js";
import { Data_ActiveSkill } from "./skill_active.js";
export class Data_VTuber {
}
/** Kagura Suzu from .LIVE */
Data_VTuber.ID_0000_KaguraSuzu = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Uses melee skills", "A member of .LIVE and the former idol club. Plays the violin.", function (level) { return level * 100; }, function (level) { return level * 5; }, [new SkillLevelRequirement(1, Data_ActiveSkill.ID_0000_InaccurateStrike)], [], ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);
/** Mokota Mememe from .LIVE */
Data_VTuber.ID_0001_MokotaMememe = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "Uses melee skills", "A member of .LIVE and the former idol club. Self proclaimed human-sheep-alpaca chimera.", function (level) { return level * 100; }, function (level) { return level * 5; }, [new SkillLevelRequirement(1, Data_ActiveSkill.ID_0000_InaccurateStrike)], [], ["https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw", "https://twitter.com/mokomeme_ch"]);
/** The list of all VTubers. */
Data_VTuber.List = new DataCollection([
    Data_VTuber.ID_0000_KaguraSuzu,
    Data_VTuber.ID_0001_MokotaMememe
]);
//# sourceMappingURL=vtuber.js.map