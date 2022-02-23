import { DataTemplate } from "../common/base_classes.js";
import { ActiveSkill } from "./skill_active.js";
/**
 * Data definitions of VTubers.
 */
export class VTuber extends DataTemplate {
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
    constructor(id, nameEN, nameJP, oshimark, description, xpcurve, strcurve, activeskills, links) {
        super(id, nameEN !== null && nameEN !== void 0 ? nameEN : "Undefined", description !== null && description !== void 0 ? description : "This is as mysterious as it gets.");
        this.NameJP = nameJP !== null && nameJP !== void 0 ? nameJP : "None";
        this.OshiMark = oshimark !== null && oshimark !== void 0 ? oshimark : "None";
        this.XPCurve = xpcurve !== null && xpcurve !== void 0 ? xpcurve : function (lvl) { return lvl * 100; };
        this.StrengthCurve = strcurve !== null && strcurve !== void 0 ? strcurve : function (lvl) { return lvl * 5; };
        this.ActiveSkills = activeskills !== null && activeskills !== void 0 ? activeskills : [ActiveSkill.ID_0000_Strike];
        this.Links = links !== null && links !== void 0 ? links : [];
    }
    /**
     * Fetches the VTuber by their ID from the list.
     * @param id The ID of the data entry to return.
     * @returns A VTuber.
     */
    static get_by_id(id) {
        var _a;
        return (_a = this.List.find(vtub => vtub.ID == id)) !== null && _a !== void 0 ? _a : new VTuber(id);
    }
}
//#region VTuber entries
/** Kagura Suzu from .LIVE */
VTuber.ID_0000_KaguraSuzu = new VTuber(0, "Kagura Suzu", "神楽すず", "🍋", "Plays the violin.", function (level) { return level * 100; }, function (level) { return level * 5; }, [ActiveSkill.ID_0000_Strike], ["https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w", "https://twitter.com/kagura_suzu"]);
/** Mokota Mememe from .LIVE */
VTuber.ID_0001_MokotaMememe = new VTuber(0, "Mokota Mememe", "もこ田めめめ", "🐏", "A human-sheep-alpaca chimera.", function (level) { return level * 100; }, function (level) { return level * 5; }, [ActiveSkill.ID_0000_Strike], ["https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw", "https://twitter.com/mokomeme_ch"]);
//#endregion
/** List of VTubers. */
VTuber.List = [
    VTuber.ID_0000_KaguraSuzu,
    VTuber.ID_0001_MokotaMememe
];
/**
 * List of agencies.
 */
class Agency extends DataTemplate {
    /**
     * Constructor for this list of agencies. Sets the agency reference in their members.
     * @param id ID of the VTuber.
     * @param name Name of the agency.
     * @param description Description of the agency.
     * @param members The members of this agency.
     */
    constructor(id, name, description, members) {
        super(id, name, description);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
}
//#region
/**
 * .LIVE, AppLand
 */
Agency.ID_0000_DOTLIVE = new Agency(0, ".LIVE", "VTuber group owned by AppLand. Home of Cyber Girl Siro and the former Idol Club.", [VTuber.ID_0000_KaguraSuzu,
    VTuber.ID_0001_MokotaMememe]);
/**
 * Synergies for certain groups of VTubers.
 */
class VTuberSynergy extends DataTemplate {
    /**
     * Constructor for this list of synergies.
     * @param id ID of the VTuber.
     * @param name Name of the synergy.
     * @param description Description of the synergy.
     * @param members The members of this synergy.
     */
    constructor(id, name, description, members) {
        super(id, name, description);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
}
//#region
/**
 * Independent VTubers.
 */
VTuberSynergy.ID_0000_Gorillas = new Agency(0, "Gorillas", "Primal strength of modern society.", []);
//# sourceMappingURL=vtubers.js.map