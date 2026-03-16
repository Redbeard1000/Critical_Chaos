export type CharacterInput = {
  name: string;
  klasse?: string | null;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  empathy?: number;
  level?: number;
  // Strength skills
  might?: number;
  endurance?: number;
  melee?: number;
  crafting?: number;
  // Dexterity skills
  stealth?: number;
  sleightOfHand?: number;
  move?: number;
  ranged?: number;
  // Intelligence skills
  knowledge?: number;
  survival?: number;
  insight?: number;
  // Empathy skills
  manipulation?: number;
  performance?: number;
  healing?: number;
  animalHandling?: number;
  metadata?: Record<string, unknown> | null;
};
