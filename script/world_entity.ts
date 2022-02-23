import { VTuber } from "../data/vtuber.js";

class VTuberInstance {
    /** ID of this player instanced VTuber. Must be unique within the player state. */
    ID: number;
    /** Accumulated experience of this VTuber. */
    XP: number;
    
    get Level(): number {
        var curve = VTuber.get_by_id(this.ID, VTuber.List).XPCurve;
        var required_xp = curve(1);
        var current_level = 1;
        while (required_xp <= this.XP) {
            required_xp += curve(++current_level);
        }
        return current_level;
    }
    get Strength(): number {

    }
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