import { useState } from "react";
import {
  rollDice,
  DiceResult,
  WheatherResult,
  rollWheather,
} from "../utils/diceRoller";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/chat";
import { Chat } from "./Chat";

import { DiceIcon } from "../icons/customIcons";
import "../styles/DM.css";

const diceTypes = [4, 6, 8, 10, 12, 20, 100];
const diceCounts = [1, 2, 3, 4, 5, 6];

export const DM = () => {
  const [result, setResult] = useState<DiceResult | null>(null);
  const [resultLabel, setResultLabel] = useState("");
  const dispatch = useDispatch();

  const [wheatherResult, setWheatherResult] = useState<WheatherResult | null>(
    null,
  );

  const handleRoll = (count: number, sides: number) => {
    const diceRollResult = rollDice(count, sides);

    setResult(diceRollResult);
    setResultLabel(`${count}d${sides}`);
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const logText = `[${time}] Würfelwurf: ${count}d${sides} ➔ Ergebnis: ${diceRollResult.total}`;
    dispatch(addMessage(logText));
  };

  const handleFudgeRoll = (count: number) => {
    const rolls = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 3) - 1,
    );
    const fudgeResult: DiceResult = {
      sides: 3,
      count,
      rolls,
      total: rolls.reduce((sum, roll) => sum + roll, 0),
    };
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setResult(fudgeResult);
    setResultLabel(`${count} Fudge`);
    dispatch(
      addMessage(
        `[${time}] Fudge-Wurf: ${count} Würfel ➔ Ergebnis: ${fudgeResult.total}`,
      ),
    );
  };

  const handleWeatherRoll = () => {
    setWheatherResult(rollWheather());
  };

  return (
    <div className="dm-page">
      <h1 className="dm-title">Dungeon Master Schmiede</h1>

      <div className="dm-layout">
        <main className="dm-content">
          <div className="weather-result">
            <div className="dm-heading">
              <h3>Wetter:</h3>
              <div className="weather-control">
                <Button
                  variant="outlined"
                  startIcon={<DiceIcon sx={{ fontSize: 32 }} />}
                  onClick={handleWeatherRoll}
                >
                  Würfeln
                </Button>
              </div>
            </div>
            {wheatherResult ? (
              <p>
                Wind: {wheatherResult.wind.description} <br />
                Schnee: {wheatherResult.snow.description} <br />
                Kälte: {wheatherResult.cold.description}
              </p>
            ) : (
              <p className="weather-empty">
                Die Götter (der DM) muss sich noch entscheiden.
              </p>
            )}
          </div>

          <div className="dice-generator">
            <div className="dice-generator__header">
              <h2>Würfelgenerator</h2>
              <span>Würfelanzahl</span>
            </div>
            <div className="dice-grid" role="grid" aria-label="Würfelgenerator">
              <div className="dice-grid__corner" aria-hidden="true" />
              {diceCounts.map((count) => (
                <div className="dice-grid__column-label" key={count}>
                  {count}
                </div>
              ))}

              {diceTypes.map((sides) => (
                <div className="dice-grid__row" role="row" key={sides}>
                  <div className="dice-grid__label">D{sides}</div>
                  {diceCounts.map((count) => (
                    <button
                      className="dice-grid__button"
                      key={`${sides}-${count}`}
                      onClick={() => handleRoll(count, sides)}
                      aria-label={`${count} Würfel mit ${sides} Seiten würfeln`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              ))}
              <div className="dice-grid__row" role="row">
                <div className="dice-grid__label">Fudge</div>
                {diceCounts.map((count) => (
                  <button
                    className="dice-grid__button"
                    key={`fudge-${count}`}
                    onClick={() => handleFudgeRoll(count)}
                    aria-label={`${count} Fudge-Würfel würfeln`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div className="dice-result">
              <h2>Ergebnis: {result.total}</h2>
              <p>
                {resultLabel}: {result.rolls.join(" + ")} = {result.total}
              </p>
            </div>
          )}
        </main>
        <Chat />
      </div>
    </div>
  );
};
