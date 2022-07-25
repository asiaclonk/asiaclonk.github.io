import { VTuberInstance } from "../entity_instance/vtuber.js";
import { EventType } from "./enum.js";
import { GameEvent } from "./interface.js";

/** Notifies that a VTuber gains a level. */
export class LevelUpEvent implements GameEvent {
    EventType: EventType = EventType.LevelUp;

    /** The amount of levels that were gained in this instance. */
    GainedLevels: number;
    /** The VTuber who sent this event. */
    Sender: VTuberInstance;

    constructor(sender: VTuberInstance, gainedLevels: number) {
        this.GainedLevels = gainedLevels;
        this.Sender = sender;
    }
}

/** Notifies that a VTuber gains experience. */
export class ExperienceGainEvent implements GameEvent {
    EventType: EventType = EventType.XPGain;

    /** The amount of experience that was gained in this instance. */
    GainedXP: number;
    /** The VTuber who sent this event. */
    Sender: VTuberInstance;

    constructor(sender: VTuberInstance, gainedXP: number) {
        this.GainedXP = gainedXP;
        this.Sender = sender;
    }
}