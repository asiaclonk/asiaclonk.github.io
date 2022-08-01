import { Position, sum } from '../common/utility.js';
import { VTuberInstance } from './vtuber.js';

export class Party {
    /** Current position of the Party. */
    Position: Position;
    /** List of references to VTuber instances from the player state. */
    MemberIDs: number[];

    /** List of VTuber instances to be filled at runtime. */
    Members: VTuberInstance[]

    /** Combined strength of all party members. */
    get TotalStrength(): number {
        return this.Members.map((vtub) => vtub.BaseStrength).reduce(sum, 0);
    }
}