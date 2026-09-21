import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMonstersQuery } from "../store/enhancedApi";
import { addMessage } from "../store/chat";
import { rollDice } from "../utils/diceRoller";
import type { Monster } from "../store/api";
import "../styles/monsters.css";

export function Monsters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetMonstersQuery();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedMonster =
    data?.find((monster) => monster.id === selectedId) ?? data?.[0];

  useEffect(() => {
    if (selectedMonster && selectedId === null)
      setSelectedId(selectedMonster.id);
  }, [selectedMonster, selectedId]);

  function attack() {
    if (!selectedMonster) return;
    const chosenAttack =
      selectedMonster.attacks[
        Math.floor(Math.random() * selectedMonster.attacks.length)
      ];
    const result = rollDice(chosenAttack.diceCount, 6);
    dispatch(
      addMessage(
        `${selectedMonster.name} benutzt ${chosenAttack.name}: ${result.count}W6 = ${result.total} Schaden${chosenAttack.description ? ` (${chosenAttack.description})` : ""}`,
      ),
    );
  }

  return (
    <div className="monsters-page">
      <div className="monsters-page-header">
        <h1>Monster</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/Monsters/Create")}
        >
          Neues Monster
        </Button>
      </div>

      {isLoading && <p>Lade Monster...</p>}
      {error && <p className="monster-error">Konnte Monster nicht laden.</p>}
      {!isLoading && data?.length === 0 && <p>Noch keine Monster angelegt.</p>}

      {data && data.length > 0 && (
        <div className="monster-browser">
          <nav className="monster-list" aria-label="Monsterliste">
            {data.map((monster) => (
              <button
                className={
                  monster.id === selectedMonster?.id
                    ? "monster-list-item selected"
                    : "monster-list-item"
                }
                key={monster.id}
                onClick={() => setSelectedId(monster.id)}
              >
                {monster.name}
              </button>
            ))}
          </nav>

          {selectedMonster && (
            <section className="monster-detail">
              <div className="monster-detail-header">
                <div>
                  <h2>{selectedMonster.name}</h2>
                  <p>
                    Stärke {selectedMonster.strength} · Geschick{" "}
                    {selectedMonster.dexterity} · Rüstung{" "}
                    {selectedMonster.armor}
                  </p>
                </div>
                <Button variant="contained" color="error" onClick={attack}>
                  Angriff
                </Button>
              </div>
              <div className="monster-skills">
                Kraft {selectedMonster.might} · Ausdauer{" "}
                {selectedMonster.endurance} · Nahkampf {selectedMonster.melee} ·
                Handwerk {selectedMonster.crafting} · Heimlichkeit{" "}
                {selectedMonster.stealth} · Fingerfertigkeit{" "}
                {selectedMonster.sleightOfHand} · Bewegen {selectedMonster.move}{" "}
                · Fernkampf {selectedMonster.ranged}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Angriff</th>
                    <th>Beschreibung</th>
                    <th>Schaden</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMonster.attacks.map((monsterAttack, index) => (
                    <tr key={`${monsterAttack.name}-${index}`}>
                      <td>{monsterAttack.name}</td>
                      <td>{monsterAttack.description || "-"}</td>
                      <td>{monsterAttack.diceCount}W6</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
