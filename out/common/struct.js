/** Grouping of all kinds of different things. */
export class StateRequirement {
}
/**
 * Grouping of skills and level requirements.
 */
export class SkillLevelRequirement {
    /**
     * Creates a new skill with a level requirement.
     * @param requirement The level requirement for unlocking the accompanying skill.
     * @param skill The skill being locked behind the level requirement.
     */
    constructor(requirement, skill) {
        this.RequiredLevel = requirement;
        this.Skill = skill;
    }
}
/**
 * Grouping of item and drop probability.
 */
export class ItemDrop {
    /**
     * Creates a new item drop.
     * @param amount The amount of stacks that drops from this.
     * @param item The item in question.
     * @param weight The dropweight of the item compared to others.
     */
    constructor(item, amount, weight) {
        this.Item = item;
        this.Amount = amount;
        this.Weight = weight;
    }
}
/**
 * Defines the position of a party in the game, on the map and inside dungeons.
 */
export class Position {
    /**
     * Creates a new position.
     * @param x The X position on the current map.
     * @param y The Y position on the current map.
     */
    constructor(x, y) {
        this.XPos = x;
        this.YPos = y;
    }
}
//# sourceMappingURL=struct.js.map