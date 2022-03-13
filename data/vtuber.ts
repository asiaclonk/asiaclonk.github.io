import { DataTemplate } from "../common/base_classes.js";
import { SkillLevelRequirement } from "../common/utility.js";
import { Agency } from "./agency.js";
import { ActiveSkill } from "./skill_active.js";

/**
 * A function type that should take a desired level and return the corresponding stat.
 */
type LevelCurve = (targetlevel: number) => number;

/**
 * Data definitions of VTubers.
 */
export class VTuber extends DataTemplate {
    //#region VTuber entries
    /** Kagura Suzu from .LIVE */
    static ID_0000_KaguraSuzu: VTuber = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Uses melee skills", "A member of .LIVE and the former idol club. Plays the violin.",
        function (level: number) { return level * 100; },
        function (level: number) { return level * 5; },
        [new SkillLevelRequirement(1, ActiveSkill.ID_0000_InaccurateStrike)], [],
        ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);
    /** Mokota Mememe from .LIVE */
    static ID_0001_MokotaMememe: VTuber = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "Uses melee skills", "A member of .LIVE and the former idol club. Self proclaimed human-sheep-alpaca chimera.",
        function (level: number) { return level * 100; },
        function (level: number) { return level * 5; },
        [new SkillLevelRequirement(1, ActiveSkill.ID_0000_InaccurateStrike)], [],
        ["https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw", "https://twitter.com/mokomeme_ch"]);
    //#endregion

    //#region
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
     * @param description The description of this VTuber.
     * @param lore The flavor text of this VTuber.
     * @param xpCurve XP curve of this VTuber that defines the required XP of each level.
     * @param strCurve Strength curve of this VTuber that defines the strength of each level.
     * @param activeSkills List of active skills used by this VTuber and their level requirement.
     * @param passiveSkills List of passive skills used by this VTuber and their level requirement.
     * @param links A list of links to the VTuber's social media presence of choice.
    */
    constructor(id: number, nameEN?: string, nameJP?: string, oshimark?: string, description?: string, lore?: string, xpCurve?: LevelCurve, strCurve?: LevelCurve, activeSkills?: SkillLevelRequirement[], passiveSkills?: SkillLevelRequirement[], links?: string[]) {
        super(id, nameEN, description, lore);
        this.NameJP = nameJP ?? "None";
        this.OshiMark = oshimark ?? "None";
        this.XPCurve = xpCurve ?? function (lvl) { return lvl * 100 };
        this.StrengthCurve = strCurve ?? function (lvl) { return lvl * 5 };
        this.ActiveSkills = activeSkills ?? [];
        this.PassiveSkills = passiveSkills ?? [];
        this.Links = links ?? [];
    }
    //#endregion
}

