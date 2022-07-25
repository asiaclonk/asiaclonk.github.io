/**
 * Instanced status effects currently applied to an actor.
 */
export class Status {
    /**
     * Creates a new Status instance.
     * @param type The type of this Status.
     * @param showStacks Whether the amount of stacks should be displayed.
     * @param stacks The amount of stacks of this status.
     */
    constructor(type, showStacks, stacks) {
        this.ShowStacks = showStacks;
        this.Stacks = stacks;
        this.Type = type;
    }
}
//# sourceMappingURL=status.js.map