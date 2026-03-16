export interface DiceResult {
  sides: number;
  count: number;
  rolls: number[];
  total: number;
}

export interface WindResult {
  roll: number;
  description: string;
}

// Normale Würfel würfe
export const rollDice = (count: number = 1, sides: number = 6): DiceResult => {
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return {
    sides,
    count,
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0),
  };
};
// Würfe auf Wetter

export const rollWind = (): WindResult => {
  const roll = Math.floor(Math.random() * 6) + 1;

  let description: string;
  if (roll <= 3) {
    description = "Leichte Brise";
  } else if (roll <= 5) {
    description = "Starker Wind";
  } else {
    description = "Sturm";
  }

  return { roll, description };
};
