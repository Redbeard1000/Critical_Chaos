import { useState } from "react";
import {
  rollDice,
  DiceResult,
  rollWind,
  WindResult,
} from "../utils/diceRoller";
import { Button } from "@mui/material";

import { DiceIcon } from "../icons/customIcons";

export const DM = () => {
  const [result, setResult] = useState<DiceResult | null>(null);
  const [windResult, setWindResult] = useState<WindResult | null>(null);
  const [diceType, setDiceType] = useState(20);

  const handleRoll = () => {
    setResult(rollDice(1, diceType));
    setWindResult(rollWind());
  };

  const handleWindRoll = () => {
    setWindResult(rollWind());
  };

  return (
    <>
      <h1>Dungeon Master Schmiede</h1>

      <div>
        Wind:
        <Button
          variant="outlined"
          startIcon={<DiceIcon sx={{ fontSize: 100 }} />}
          onClick={handleWindRoll}
        >
          Würfeln
        </Button>
      </div>

      {windResult && (
        <div>
          <h3>W6 Ergebnis: {windResult.roll}</h3>
          <p>
            <strong>{windResult.description}</strong>
          </p>
        </div>
      )}

      <div>
        <label>
          Würfel:
          <select
            value={diceType}
            onChange={(e) => setDiceType(Number(e.target.value))}
          >
            <option value={4}>d4</option>
            <option value={6}>d6</option>
            <option value={8}>d8</option>
            <option value={10}>d10</option>
            <option value={12}>d12</option>
            <option value={20}>d20</option>
            <option value={100}>d100</option>
          </select>
        </label>

        <button onClick={handleRoll}>Würfeln</button>
      </div>

      {result && (
        <div>
          <h2>Ergebnis: {result.total}</h2>
        </div>
      )}
    </>
  );
};
