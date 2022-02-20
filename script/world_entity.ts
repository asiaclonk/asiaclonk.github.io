import { VTuber } from "../data/vtubers";

class VTuberInstance {
    /**
     * ID of this player instanced VTuber. Must be unique within the player state.
     */
    ID: number;
    XP: number;
    get Level(): number { VTuber.get_by_id(ID).x

    }
    BaseStrength():
}

class Party {
    /**
     * Current location of the Party on the worldmap.
     */
    Coords: Coordinate;
    /**
     * List of references to VTuber instances.
     */
    MemberIDs: number[];

    /**
     * List of VTuber instances to be filled at runtime.
     */
    Members: VTuberInstance[]
    /**
     * Combined strength of all party members.
     */
    TotalStrength(): number {
        this.Members.reduce((vtub) => vtub.)
    }
}