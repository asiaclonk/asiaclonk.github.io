import { DataTemplate } from "../common/base_classes.js";
import { VTuber } from "./vtuber.js";

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
    /** List of VTubers that are part of this agency. */
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