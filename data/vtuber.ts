import { DataTemplate } from "../common/base_classes.js";
import { SkillRequirement as SkillLevelRequirement } from "../common/utility.js";
import { ActiveSkill } from "./skill_active.js";
import { PassiveSkill } from "./skill_passive.js";

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
    static ID_0000_KaguraSuzu: VTuber = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Uses melee skills.", "A member of .LIVE and the former idol club. Plays the violin.",
        function (level: number) { return level * 100; },
        function (level: number) { return level * 5; },
        [new SkillLevelRequirement(1, ActiveSkill.ID_0000_InaccurateStrike)], [],
        ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);
    /** Mokota Mememe from .LIVE */
    static ID_0001_MokotaMememe: VTuber = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "Uses melee skills.", "A member of .LIVE and the former idol club. Self proclaimed human-sheep-alpaca chimera.",
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
    /** XP curve of this VTuber that defines the required XP for the next level. */
    XPCurve: LevelCurve;
    /** Strength curve of this VTuber that defines the strength of the current level. */
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

/**
 * Groups of VTubers who work under the same employer.
 */
export class Agency extends DataTemplate {
    //#region
    /** .LIVE, AppLand */
    static ID_0000_DOTLIVE = new Agency(0, ".LIVE", "VTuber group owned by AppLand. Home of Cyber Girl Siro and the former Idol Club.",
        [VTuber.ID_0000_KaguraSuzu, VTuber.ID_0001_MokotaMememe]);
    //#endregion

    //#region
    /** List of IDs of VTubers that are part of this agency. */
    Members: VTuber[]

    /**
     * Creates a new agency entry. Sets the agency reference in their members.
     * @param id ID of the VTuber.
     * @param name Name of the agency.
     * @param description Description of the agency.
     * @param members The members of this agency.
     */
    constructor(id: number, name: string, description: string, members: VTuber[]) {
        super(id, name, description);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
    //#endregion
}

/**
 * Synergies for certain groups of VTubers that provide bonuses.
 */
export class VTuberSynergy extends DataTemplate {
    //#region
    /** Independent VTubers. */
    static ID_0000_Gorillas = new Agency(0, "Gorillas", "Primal strength of modern society.", []);
    //#endregion

    //#region
    /** List of IDs of VTubers that are part of this synergy. */
    Members: VTuber[]
    /** Passive skills granted by this synergy. */
    Skills: any[] //TODO: define passive skills

    /**
     * Creates a new synergy entry.
     * @param id ID of the VTuber.
     * @param name Name of the synergy.
     * @param description Description of the synergy.
     * @param members The members of this synergy.
     */
    constructor(id: number, name?: string, description?: string, members?: VTuber[]) {
        super(id, name ?? "Undefined", description ?? "This is as mysterious as it gets.");
        this.Members = members ?? [];
        this.Members.forEach((tuber) => tuber.Agency = this);
    }
    //#endregion
}