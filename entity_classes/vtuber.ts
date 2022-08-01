import { DataTemplate } from '../common/base_classes.js';
import { SkillLevelRequirement } from '../common/utility.js';
import { Agency } from './agency.js';

/**
 * A function type that should take a desired level and return the corresponding stat.
 */
type LevelCurve = (targetlevel: number) => number;

/**
 * Data definitions of VTubers.
 */
export class VTuber extends DataTemplate {
    /** Name of the VTuber written in Japanese. */
    NameJP: string;
    /** The oshi mark (fan emoji) of the VTuber. */
    OshiMark: string;
    /** The rarity of this VTuber */
    Rarity: number;
    /** Agency this VTuber belongs to. */
    Agency: Agency;
    /** XP curve of this VTuber that defines the required XP for the level after the given level. */
    XPCurve: LevelCurve;
    /** Strength curve of this VTuber that defines the strength of the given level. */
    StrengthCurve: LevelCurve;
    /** List of links to the VTuber's social media presence of choice. */
    Links: string[];
    /** List of active skills used by this VTuber and their level requirement. */
    ActiveSkills: SkillLevelRequirement[];
    /** List of passive skills used by this VTuber and their level requirement. */
    PassiveSkills: SkillLevelRequirement[];
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
    constructor(id: number, nameEN?: string, nameJP?: string, oshimark?: string, note?: string, lore?: string, xpCurve?: LevelCurve, strCurve?: LevelCurve, activeSkills?: SkillLevelRequirement[], passiveSkills?: SkillLevelRequirement[], links?: string[]) {
        super(id, nameEN, note, lore);
        this.NameJP = nameJP ?? 'None';
        this.OshiMark = oshimark ?? 'None';
        this.XPCurve = xpCurve ?? function (lvl) { return lvl * 100 };
        this.StrengthCurve = strCurve ?? function (lvl) { return lvl * 5 };
        this.ActiveSkills = activeSkills ?? [];
        this.PassiveSkills = passiveSkills ?? [];
        this.Links = links ?? [];
    }
}

