import { DataTemplate } from '../common/base_classes.js';
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
        this.NameJP = nameJP !== null && nameJP !== void 0 ? nameJP : 'None';
        this.OshiMark = oshimark !== null && oshimark !== void 0 ? oshimark : 'None';
        this.XPCurve = xpCurve !== null && xpCurve !== void 0 ? xpCurve : function (lvl) { return lvl * 100; };
        this.StrengthCurve = strCurve !== null && strCurve !== void 0 ? strCurve : function (lvl) { return lvl * 5; };
        this.ActiveSkills = activeSkills !== null && activeSkills !== void 0 ? activeSkills : [];
        this.PassiveSkills = passiveSkills !== null && passiveSkills !== void 0 ? passiveSkills : [];
        this.Links = links !== null && links !== void 0 ? links : [];
    }
}
//# sourceMappingURL=vtuber.js.map