import { DataTemplate, DataType } from "../common/base_classes.js";
import { ActiveSkill } from "./skills_active.js";

/**
 * A function type that should take a desired level and return the corresponding stat.
 */
type LevelCurve = (targetlevel: number) => number;

/**
 * Data definitions of VTubers.
 */
export class VTuber extends DataTemplate {
    //#region
    /**
     * Kagura Suzu
     */
    static ID_0000_KaguraSuzu: VTuber = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Plays the violin.",
        function (level: number) {
            return level * 100;
        },
        function (level: number) {
            return level * 5;
        },
        [ActiveSkill.ID_0000_Strike],
        ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);

    static ID_0001_MokotaMememe: VTuber = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "A human-sheep-alpaca chimera.",
        function (level: number) {
            return level * 100;
        },
        function (level: number) {
            return level * 5;
        },
        [ActiveSkill.ID_0000_Strike],
        ["https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw", "https://twitter.com/mokomeme_ch"]);
    //#endregion

    /**
     * List of VTubers.
     */
    static List: VTuber[] = [
        VTuber.ID_0000_KaguraSuzu,
        VTuber.ID_0001_MokotaMememe
    ]

    //#region
    /**
     * Name of the VTuber written in English.
     */
    declare Name: string
    /**
     * Name of the VTuber written in Japanese.
     */
    NameJP: string
    /**
     * The oshi mark (fan emoji) of the VTuber.
     */
    OshiMark: string
    /**
     * Agency this VTuber belongs to.
     */
    Agency: Agency
    /**
     * XP curve of this VTuber that defines the required XP of each level.
     */
    XPCurve: LevelCurve
    /**
     * Strength curve of this VTuber that defines the strength of each level.
     */
    StrengthCurve: LevelCurve
    /**
     * List of links to the VTuber's social media presence of choice.
     */
    Links: string[]
    /**
     * List of active skills used by this VTuber.
     */
    ActiveSkills: ActiveSkill[]

    /**
     * Constructor for this list of VTubers.
     * @param id ID of the VTuber.
     * @param nameEN Name of the VTuber written in English.
     * @param nameJP Name of the VTuber written in Japanese.
     * @param oshimark The oshi mark (fan emoji) of the VTuber.
     * @param description Description of the VTuber.
     * @param xpcurve XP curve of this VTuber that defines the required XP of each level.
     * @param strcurve Strength curve of this VTuber that defines the strength of each level.
     * @param activeskills List of active skills used by this VTuber.
     * @param links A list of links to the VTuber's social media presence of choice.
    */
    constructor(id: number, nameEN: string, nameJP: string, oshimark: string, description: string, xpcurve: LevelCurve, strcurve: LevelCurve, activeskills: ActiveSkill[], links: string[]) {
        super(id, nameEN, description, DataType.VTuber);
        this.Name = nameEN;
        this.NameJP = nameJP;
        this.OshiMark = oshimark;
        this.XPCurve = xpcurve;
        this.StrengthCurve = strcurve;
        this.ActiveSkills = activeskills;
        this.Links = links;
    }
    //#endregion
}

/**
 * List of agencies.
 */
class Agency extends DataTemplate {
    //#region
    /**
     * .LIVE, AppLand
     */
    static ID_0000_DOTLIVE = new Agency(0, ".LIVE", "VTuber group owned by AppLand. Home of Cyber Girl Siro and the former Idol Club.",
        [VTuber.ID_0000_KaguraSuzu,
         VTuber.ID_0001_MokotaMememe]);
    //#endregion
    //#region
    /**
     * List of IDs of VTubers that are part of this agency.
     */
    Members: VTuber[]

    /**
     * Constructor for this list of agencies. Sets the agency reference in their members.
     * @param id ID of the VTuber.
     * @param name Name of the agency.
     * @param description Description of the agency.
     * @param members The members of this agency.
     */
    constructor(id: number, name: string, description: string, members: VTuber[]) {
        super(id, name, description, DataType.Agency);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
    //#endregion
}

/**
 * Synergies for certain groups of VTubers.
 */
class VTuberSynergy extends DataTemplate {
    //#region
    /**
     * Independent VTubers.
     */
    static ID_0000_Gorillas = new Agency(0, "Gorillas", "Primal strength of modern society.",
        []);
    //#endregion
    //#region
    /**
     * List of IDs of VTubers that are part of this synergy.
     */
    Members: VTuber[]
    /**
     * Passive skills granted by this synergy.
     */
    Skills: any[] //TODO: define passive skills

    /**
     * Constructor for this list of synergies.
     * @param id ID of the VTuber.
     * @param name Name of the synergy.
     * @param description Description of the synergy.
     * @param members The members of this synergy.
     */
    constructor(id: number, name: string, description: string, members: VTuber[]) {
        super(id, name, description, DataType.Agency);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
    //#endregion
}