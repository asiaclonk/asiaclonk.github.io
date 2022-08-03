import { sum } from '../common/utility.js';
export class Party {
    constructor(coordinates, mapId, members) {
        this.Coordinates = coordinates;
        this.MapId = mapId,
            this.Members = members !== null && members !== void 0 ? members : [];
    }
    /** Combined strength of all party members. */
    get TotalStrength() {
        return this.Members.map((vtub) => vtub.BaseStrength).reduce(sum, 0);
    }
}
//# sourceMappingURL=party.js.map