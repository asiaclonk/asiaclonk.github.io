import { sum } from "../common/utility.js";
export class Party {
    /** Combined strength of all party members. */
    get TotalStrength() {
        return this.Members.map((vtub) => vtub.BaseStrength).reduce(sum, 0);
    }
}
//# sourceMappingURL=party.js.map