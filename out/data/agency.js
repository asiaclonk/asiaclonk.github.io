import { DataTemplate } from "../common/base_classes.js";
import { VTuber } from "./vtuber.js";
/**
 * Groups of VTubers who work under the same employer.
 */
export class Agency extends DataTemplate {
    /**
     * Creates a new agency entry. Sets the agency reference in their members.
     * @param id ID of the VTuber.
     * @param name Name of the agency.
     * @param note note of the agency.
     * @param members The members of this agency.
     */
    constructor(id, name, note, members) {
        super(id, name, note);
        this.Members = members;
        members.forEach((tuber) => tuber.Agency = this);
    }
}
//#region Agency entries
/** .LIVE, AppLand */
Agency.ID_0000_DOTLIVE = new Agency(0, ".LIVE", "VTuber group owned by AppLand. Home of Cyber Girl Siro and the former Idol Club.", [VTuber.ID_0000_KaguraSuzu, VTuber.ID_0001_MokotaMememe]);
//# sourceMappingURL=agency.js.map