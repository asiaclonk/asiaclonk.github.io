import { StatusType } from '../common/enum.js';

/**
 * Instanced status effects currently applied to an actor.
 */
export class Status {
    /** The type of this Status. */
    Type: StatusType;
    /** If true, shows the amount of stacks on this status. */
    ShowStacks: boolean;
    /** The current amount of stacks on this status. */
    Stacks: number;
    
    /**
     * Creates a new Status instance.
     * @param type The type of this Status.
     * @param showStacks Whether the amount of stacks should be displayed.
     * @param stacks The amount of stacks of this status.
     */
    constructor (type: StatusType, showStacks: boolean, stacks: number) {
        this.ShowStacks = showStacks;
        this.Stacks = stacks;
        this.Type = type;
    }
}