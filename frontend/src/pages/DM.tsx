import { useState } from "react";
import {
  rollDice,
  DiceResult,
  WheatherResult,
  rollWheather,
} from "../utils/diceRoller";
import { Button } from "@mui/material";

import { DiceIcon } from "../icons/customIcons";

export const DM = () => {
  const [result, setResult] = useState<DiceResult | null>(null);

  const [diceType, setDiceType] = useState(20);
  const [wheatherResult, setWheatherResult] = useState<WheatherResult | null>(
    null,
  );

  const handleRoll = () => {
    setResult(rollDice(1, diceType));
  };

  const handleWeatherRoll = () => {
    setWheatherResult(rollWheather());
  };

  return (
    <>
      <h1>Dungeon Master Schmiede</h1>

      <div>
        Wetter:
        <Button
          variant="outlined"
          startIcon={<DiceIcon sx={{ fontSize: 32 }} />}
          onClick={handleWeatherRoll}
        >
          Würfeln
        </Button>
      </div>

      {wheatherResult && (
        <div>
          <h3>Wetter: </h3>
          <p>
            Wind: {wheatherResult.wind.description} <br />
            Schnee: {wheatherResult.snow.description} <br />
            Kälte: {wheatherResult.cold.description}
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
