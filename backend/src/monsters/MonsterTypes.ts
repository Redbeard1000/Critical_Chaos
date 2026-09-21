export type MonsterAttack = {
  name: string;
  description: string;
  diceCount: number;
};

export type MonsterInput = {
  name: string;
  strength?: number;
  dexterity?: number;
  armor?: number;
  might?: number;
  endurance?: number;
  melee?: number;
  crafting?: number;
  stealth?: number;
  sleightOfHand?: number;
  move?: number;
  ranged?: number;
  attacks: MonsterAttack[];
};
