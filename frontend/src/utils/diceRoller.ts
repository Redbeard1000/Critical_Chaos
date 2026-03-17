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

export interface SnowResult {
  roll: number;
  description: string;
}

export interface ColdResult {
  roll: number;
  description: string;
}

export interface WheatherResult {
  wind: WindResult;
  snow: SnowResult;
  cold: ColdResult;
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

// Wind würfe
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

// Schnee würfe
export const rollSnow = (): SnowResult => {
  const roll = Math.floor(Math.random() * 6) + 1;

  let description: string;
  if (roll <= 3) {
    description = "Kein Schneefall";
  } else if (roll <= 5) {
    description = "Leichter Schneefall";
  } else {
    description = "Schnee Sturm";
  }

  return { roll, description };
};

// Kältewurf
export const rollCold = (): ColdResult => {
  const roll = Math.floor(Math.random() * 6) + 1;

  let description: string;
  if (roll <= 3) {
    description = "Kalt";
  } else if (roll <= 5) {
    description = "Beissende Kälte";
  } else {
    description = "Bis auf die Knochen Kalt";
  }

  return { roll, description };
};

// Wetterwurf Gesamt
// In Zukunft sollen Wetter Beschreibungen in der Datenbank stehen und je nach kombi sollen die dann
// zufällig ausgegeben werden.

export const rollWheather = (): WheatherResult => {
  const wind = rollWind();
  const snow = rollSnow();
  const cold = rollCold();

  return {
    wind,
    snow,
    cold,
    description: `Wind: ${wind.description}, Schnee: ${snow.description}, Kälte: ${cold.description}`,
  };
};
