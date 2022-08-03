import { EventType } from './enum.js';
/** Notifies that a VTuber gains a level. */
export class LevelUpEvent {
    constructor(sender, gainedLevels) {
        this.EventType = EventType.LevelUp;
        this.GainedLevels = gainedLevels;
        this.Sender = sender;
    }
}
/** Notifies that a VTuber gains experience. */
export class ExperienceGainEvent {
    constructor(sender, gainedXP) {
        this.EventType = EventType.XPGain;
        this.GainedXP = gainedXP;
        this.Sender = sender;
    }
}
//# sourceMappingURL=event.js.map