export type CharacterInput = {
  name: string;
  klasse?: string | null;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  level?: number;
  xp?: number;
  hp?: number;
  mp?: number;
  metadata?: Record<string, unknown> | null;
};
