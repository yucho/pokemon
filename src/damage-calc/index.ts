import { getMissingFieldError } from 'src/utils/errors';

type PokemonStat = {
  level: number;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
};

export type PhysicalAttackerStats = Pick<PokemonStat, 'level' | 'attack'> ;
export type PhysicalDefenderStats = Pick<PokemonStat, 'level' | 'defense'>;
export type SpecialAttackerStats = Pick<PokemonStat, 'level' | 'spAttack'>;
export type SpecialDefenderStats = Pick<PokemonStat, 'level' | 'spDefense'>;

export const CATEGORY_PHYSICAL = 'physical';
export const CATEGORY_SPECIAL = 'special';

export type PokemonMove = {
  category: typeof CATEGORY_PHYSICAL | typeof CATEGORY_SPECIAL;
  power: number;
};

export type PokemonMovePhysical = PokemonMove & {
  category: typeof CATEGORY_PHYSICAL;
};

export type PokemonMoveSpecial = PokemonMove & {
  category: typeof CATEGORY_SPECIAL;
};

type CalcDamageParams =
  [attacker: PhysicalAttackerStats, defender: PhysicalDefenderStats, move: PokemonMovePhysical, category: typeof CATEGORY_PHYSICAL] |
  [attacker: SpecialAttackerStats, defender: SpecialDefenderStats, move: PokemonMoveSpecial, category: typeof CATEGORY_SPECIAL];

export const calcDamage = (...[attacker, defender, move, category]: CalcDamageParams) => {
  let atk, def;

  if (category === CATEGORY_PHYSICAL) {
    move;
    atk = attacker.attack;
    def = defender.defense;
  } else if (category === CATEGORY_SPECIAL) {
    atk = attacker.spAttack;
    def = defender.spDefense;
  } else {
    throw getMissingFieldError('attacker/defender', ['attack/spAttack', 'defense/spDefense']);
  }

  const atkLv = attacker.level;
  const defLv = defender.level;
  const { power } = move;

  // 攻撃側のレベル × 2 ÷ 5 ＋ 2 → 切り捨て
  // 　× 物理技(特殊技)の威力 × 攻撃側のこうげき(とくこう) ÷ 防御側のぼうぎょ(とくぼう) → 切り捨て
  // 　÷ 50 ＋ 2
  const damage = Math.floor(Math.floor(atkLv * 2 / 5 + 2) * power * atk / def) / 50 + 2;

  return damage;
};
