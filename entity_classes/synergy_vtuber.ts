import { DataTemplate } from "../common/base_classes.js";
import { Agency } from "./agency.js";
import { VTuber } from "./vtuber.js";

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
     * @param note note of the synergy.
     * @param members The members of this synergy.
     */
    constructor(id: number, name?: string, note?: string, members?: VTuber[]) {
        super(id, name ?? "Undefined", note ?? "This is as mysterious as it gets.");
        this.Members = members ?? [];
        this.Members.forEach((tuber) => tuber.Agency = this);
    }
    //#endregion
}