import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMonsterMutation } from "../store/enhancedApi";
import type { MonsterAttack, MonsterPayload } from "../store/api";
import "../styles/monsters.css";

const attackDefaults = (): MonsterAttack[] =>
  Array.from({ length: 6 }, (_, index) => ({
    name: `Angriff ${index + 1}`,
    description: "",
    diceCount: 5,
  }));

const initialForm: MonsterPayload = {
  name: "",
  strength: 1,
  dexterity: 1,
  armor: 0,
  might: 0,
  endurance: 0,
  melee: 0,
  crafting: 0,
  stealth: 0,
  sleightOfHand: 0,
  move: 0,
  ranged: 0,
  attacks: attackDefaults(),
};

const skillFields = [
  ["might", "Kraft"],
  ["endurance", "Ausdauer"],
  ["melee", "Nahkampf"],
  ["crafting", "Handwerk"],
  ["stealth", "Heimlichkeit"],
  ["sleightOfHand", "Fingerfertigkeit"],
  ["move", "Bewegen"],
  ["ranged", "Fernkampf"],
] as const;

export default function CreateMonster() {
  const [form, setForm] = useState<MonsterPayload>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [createMonster, { isLoading }] = useCreateMonsterMutation();

  function updateField<K extends keyof MonsterPayload>(
    key: K,
    value: MonsterPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateAttack(index: number, update: Partial<MonsterAttack>) {
    setForm((current) => ({
      ...current,
      attacks: current.attacks.map((attack, attackIndex) =>
        attackIndex === index ? { ...attack, ...update } : attack,
      ),
    }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!form.name.trim()) {
      setError("Name erforderlich");
      return;
    }
    if (form.attacks.some((attack) => !attack.name.trim())) {
      setError("Jeder Angriff braucht einen Namen");
      return;
    }

    try {
      await createMonster({ ...form, name: form.name.trim() }).unwrap();
      navigate("/Monsters");
    } catch (submissionError: unknown) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Speichern fehlgeschlagen",
      );
    }
  }

  return (
    <form className="monster-form" onSubmit={submit}>
      <h1>Neues Monster anlegen</h1>
      {error && <p className="monster-error">{error}</p>}

      <label>
        Name *
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
        />
      </label>

      <div className="monster-stat-grid">
        <NumberField
          label="Stärke"
          value={form.strength ?? 1}
          min={1}
          max={5}
          onChange={(value) => updateField("strength", value)}
        />
        <NumberField
          label="Geschick"
          value={form.dexterity ?? 1}
          min={1}
          max={5}
          onChange={(value) => updateField("dexterity", value)}
        />
        <NumberField
          label="Rüstung"
          value={form.armor ?? 0}
          min={0}
          max={20}
          onChange={(value) => updateField("armor", value)}
        />
      </div>

      <fieldset>
        <legend>Fertigkeiten</legend>
        <div className="monster-stat-grid">
          {skillFields.map(([key, label]) => (
            <NumberField
              key={key}
              label={label}
              value={form[key] ?? 0}
              min={0}
              max={5}
              onChange={(value) => updateField(key, value)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Monsterangriffe</legend>
        <div className="attack-editor-list">
          {form.attacks.map((attack, index) => (
            <div className="attack-editor" key={index}>
              <h2>Angriff {index + 1}</h2>
              <label>
                Name *
                <input
                  value={attack.name}
                  onChange={(event) =>
                    updateAttack(index, { name: event.target.value })
                  }
                  required
                />
              </label>
              <label>
                Beschreibung
                <textarea
                  value={attack.description}
                  onChange={(event) =>
                    updateAttack(index, { description: event.target.value })
                  }
                  rows={2}
                />
              </label>
              <label>
                Schaden (W6)
                <input
                  type="number"
                  min={5}
                  max={20}
                  value={attack.diceCount}
                  onChange={(event) =>
                    updateAttack(index, {
                      diceCount: Number(event.target.value),
                    })
                  }
                  required
                />
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Speichert..." : "Monster anlegen"}
      </button>
    </form>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label>
      {label}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
