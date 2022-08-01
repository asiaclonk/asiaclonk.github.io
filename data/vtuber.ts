import { DataCollection } from '../common/base_classes.js';
import { SkillLevelRequirement } from '../common/utility.js';
import { VTuber } from '../entity_classes/vtuber.js';
import { Data_ActiveSkill } from './skill_active.js';

export class Data_VTuber {
    /** Kagura Suzu from .LIVE */
    static ID_0000_KaguraSuzu: VTuber = new VTuber(0, 'Kagura Suzu', '神楽すず', '🍋', 'Uses melee skills', 'A member of .LIVE and the former idol club. Plays the violin.',
        function (level: number) { return level * 100; },
        function (level: number) { return level * 5; },
        [new SkillLevelRequirement(1, Data_ActiveSkill.ID_0000_InaccurateStrike)], [],
        ['https://www.youtube.com/channel/UCUZ5AlC3rTlM-rA2cj5RP6w', 'https://twitter.com/kagura_suzu']);
    /** Mokota Mememe from .LIVE */
    static ID_0001_MokotaMememe: VTuber = new VTuber(0, 'Mokota Mememe', 'もこ田めめめ', '🐏', 'Uses melee skills', 'A member of .LIVE and the former idol club. Self proclaimed human-sheep-alpaca chimera.',
        function (level: number) { return level * 100; },
        function (level: number) { return level * 5; },
        [new SkillLevelRequirement(1, Data_ActiveSkill.ID_0000_InaccurateStrike)], [],
        ['https://www.youtube.com/channel/UCz6Gi81kE6p5cdW1rT0ixqw', 'https://twitter.com/mokomeme_ch']);

    /** The list of all VTubers. */
    static List: DataCollection<VTuber> = new DataCollection<VTuber>([
        Data_VTuber.ID_0000_KaguraSuzu,
        Data_VTuber.ID_0001_MokotaMememe
    ]);
}