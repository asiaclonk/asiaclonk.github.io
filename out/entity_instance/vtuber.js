import { DataInstance } from '../common/base_classes.js';
import { ExperienceGainEvent, LevelUpEvent } from '../common/events.js';
import { ClassEvent } from '../common/utility.js';
import { Data_VTuber } from '../data/vtuber.js';
export class VTuberInstance extends DataInstance {
    constructor(listId, dataId, currentXP) {
        super(listId, dataId);
        // Events
        this.GainedLevel = new ClassEvent();
        this.GainedXP = new ClassEvent();
        this._level = 1;
        this.gain_xp(currentXP);
    }
    /** Increases the VTuber's XP. Fires the XPGained event. */
    gain_xp(gain) {
        this._xp += gain;
        this._xpToNext -= gain;
        this.GainedXP.raise(new ExperienceGainEvent(this, gain));
    }
    /** Increases the VTuber's level and fires the LevelUp event if necessary. */
    check_levelup() {
        let levelGains = 0;
        while (this._xpToNext <= 0) {
            levelGains += 1;
            this._xpToNext += Data_VTuber.List.getById(this.DataID).XPCurve(this._level);
        }
        this._level += levelGains;
        this.GainedLevel.raise(new LevelUpEvent(this, levelGains));
    }
    /** The Accumulated experience of this VTuber. */
    get XP() { return this._xp; }
    /** Sets the current XP of this VTuber to the given amount and adjusts the level accordingly. No events will be raised. */
    set XP(currentXP) {
        let curve = Data_VTuber.List.getById(this.DataID).XPCurve;
        this._xp = currentXP;
        this._level = 1;
        this._xpToNext = curve(1);
        // Level up
        while (this._xp >= this._xpToNext) {
            this._level += 1;
            this._xpToNext += curve(this._level);
        }
    }
    /** The current level of this instanced VTuber. */
    get Level() { return this._level; }
    /** Sets the current XP to the total requirement of the given level. No events will be raised. */
    set Level(level) {
        this._level = level;
        var curve = Data_VTuber.List.getById(this.DataID).XPCurve;
        var newXP = 0;
        for (var i = 1; i < level; i++) {
            newXP += curve(i);
        }
        this.XP = newXP;
    }
    /** The base strength of this instanced VTuber based on current level. */
    get BaseStrength() {
        return Data_VTuber.List.getById(this.DataID).StrengthCurve(this.Level);
    }
}
//# sourceMappingURL=vtuber.js.map