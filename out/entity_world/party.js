import { sum } from "../common/utility.js";
export class Party {
    /** Combined strength of all party members. */
    TotalStrength() {
        return this.Members.map((vtub) => vtub.Strength).reduce(sum, 0);
    }
}
//# sourceMappingURL=party.js.map