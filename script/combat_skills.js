//@ts-check
/**
 * List of skills used in the battle simulator.
 */
class ActiveSkill {
    Strike = new ActiveSkill ("Strike", "Strike the frontmost enemy for 6 damage.", 10, function (actor, combatstate) {  })

    /**
     * @type {string} Name of the skill.
     */
    Name
    /**
     * @type {string} description of the skill.
     */
    Description
    /**
     * @type {number} Strength cost of the skill.
     */
    Cost
    /**
     * @type {function} The function that defines the outcome of this skill when used on entities.
     */
    Function

    /**
     * Constructor for this list of skills.
     * @param {string} name Name of the skill.
     * @param {string} desc Description of the skill.
     * @param {number} cost Strength cost of the skill.
     * @param {function} func Function that takes an actor and combat state while returning an ActionResult.
     */
    constructor (name, desc, cost, func) {
        this.Name = name;
        this.Description = desc;
        this.Cost = cost;
        this.Function = func;
    }
}