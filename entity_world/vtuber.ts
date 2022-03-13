import { DataInstance } from "../common/base_classes.js";
import { Database } from "../data/database.js";

export class VTuberInstance extends DataInstance{
    /** The Accumulated experience of this VTuber. */
    XP: number;
    
    /** The current level of this instanced VTuber based on accumulated experience. */
    get Level(): number {
        var curve = Database.VTubers.get_by_id(this.DataID).XPCurve;
        var required_xp = curve(1);
        var current_level = 1;
        while (required_xp <= this.XP) {
            required_xp += curve(++current_level);
        }
        return current_level;
    }

    /** The current strength of this instanced VTuber based on current level. */
    get Strength(): number {
        return Database.VTubers.get_by_id(this.DataID).StrengthCurve(this.Level);
    }
}