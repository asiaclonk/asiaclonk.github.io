import { DataCollection, DataTemplate } from "../common/base_classes.js";
import { SkillLevelRequirement } from "../common/struct.js";
import { ActiveSkill } from "./skill_active.js";
/**
 * Data definitions of VTubers.
 */
export class VTuber extends DataTemplate {
    /**
     * Creates a new VTuber entry.
     * @param id ID of this VTuber.
     * @param nameEN Name of this VTuber written in English.
     * @param nameJP Name of this VTuber written in Japanese.
     * @param oshimark The oshi mark (fan emoji) of this VTuber.
     * @param note The note of this VTuber.
     * @param lore The flavor text of this VTuber.
     * @param xpCurve XP curve of this VTuber that defines the required XP of each level.
     * @param strCurve Strength curve of this VTuber that defines the strength of each level.
     * @param activeSkills List of active skills used by this VTuber and their level requirement.
     * @param passiveSkills List of passive skills used by this VTuber and their level requirement.
     * @param links A list of links to the VTuber's social media presence of choice.
    */
    constructor(id, nameEN, nameJP, oshimark, note, lore, xpCurve, strCurve, activeSkills, passiveSkills, links) {
        super(id, nameEN, note, lore);
        this.NameJP = nameJP !== null && nameJP !== void 0 ? nameJP : "None";
        this.OshiMark = oshimark !== null && oshimark !== void 0 ? oshimark : "None";
        this.XPCurve = xpCurve !== null && xpCurve !== void 0 ? xpCurve : function (lvl) { return lvl * 100; };
        this.StrengthCurve = strCurve !== null && strCurve !== void 0 ? strCurve : function (lvl) { return lvl * 5; };
        this.ActiveSkills = activeSkills !== null && activeSkills !== void 0 ? activeSkills : [];
        this.PassiveSkills = passiveSkills !== null && passiveSkills !== void 0 ? passiveSkills : [];
        this.Links = links !== null && links !== void 0 ? links : [];
    }
}
//#region VTuber entries
/** Kagura Suzu from .LIVE */
VTuber.ID_0000_KaguraSuzu = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Uses melee skills", "A member of .LIVE and the former idol club. Plays the violin.", function (level) { return level * 100; }, function (level) { return level * 5; }, [new SkillLevelRequirement(1, ActiveSkill.ID_0000_InaccurateStrike)], [], ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);
/** Mokota Mememe from .LIVE */
VTuber.ID_0001_MokotaMememe = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "Uses melee skills", "A member of .LIVE and the former idol club. Self proclaimed human-sheep-alpaca chimera.", function (level) { return level * 100; }, function (level) { return level * 5; }, [new SkillLevelRequirement(1, ActiveSkill.ID_0000_InaccurateStrike)], [], ["https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw", "https://twitter.com/mokomeme_ch"]);
//#endregion
/** The list of all VTubers. */
VTuber.List = new DataCollection([
    VTuber.ID_0000_KaguraSuzu,
    VTuber.ID_0001_MokotaMememe
]);
//# sourceMappingURL=vtuber.js.map