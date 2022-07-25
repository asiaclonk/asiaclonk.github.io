import { DataTemplate } from "../common/base_classes.js";
import { Agency } from "./agency.js";
/**
 * Synergies for certain groups of VTubers that provide bonuses.
 */
export class VTuberSynergy extends DataTemplate {
    /**
     * Creates a new synergy entry.
     * @param id ID of the VTuber.
     * @param name Name of the synergy.
     * @param note note of the synergy.
     * @param members The members of this synergy.
     */
    constructor(id, name, note, members) {
        super(id, name !== null && name !== void 0 ? name : "Undefined", note !== null && note !== void 0 ? note : "This is as mysterious as it gets.");
        this.Members = members !== null && members !== void 0 ? members : [];
        this.Members.forEach((tuber) => tuber.Agency = this);
    }
}
//#region
/** Independent VTubers. */
VTuberSynergy.ID_0000_Gorillas = new Agency(0, "Gorillas", "Primal strength of modern society.", []);
//# sourceMappingURL=synergy_vtuber.js.map