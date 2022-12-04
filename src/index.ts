import { calcDamage, CATEGORY_SPECIAL, PokemonMoveSpecial } from 'src/damage-calc';

const someAttacker = {
  level: 50,
  spAttack: 130
};

const someSpecialAttackMove: PokemonMoveSpecial = {
  power: 90,
  category: CATEGORY_SPECIAL
};

const gardivoir = {
  level: 50,
  spAttack: 150,
  spDefense: 130
};

const damage = calcDamage(someAttacker, gardivoir, someSpecialAttackMove, someSpecialAttackMove.category);

console.log(damage);
