import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCharacterMutation } from "../store/enhancedApi";
import type { CharacterPayload } from "../store/api";

export default function CreateCharacterPage() {
  const [form, setForm] = useState<CharacterPayload>({
    name: "",
    klasse: "",
    strength: 1,
    dexterity: 1,
    intelligence: 1,
    empathy: 1,
    level: 1,
    // Strength skills
    might: 0,
    endurance: 0,
    melee: 0,
    crafting: 0,
    // Dexterity skills
    stealth: 0,
    sleightOfHand: 0,
    move: 0,
    ranged: 0,
    // Intelligence skills
    knowledge: 0,
    survival: 0,
    insight: 0,
    // Empathy skills
    manipulation: 0,
    performance: 0,
    healing: 0,
    animalHandling: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [createCharacter, { isLoading }] = useCreateCharacterMutation();

  function updateField<K extends keyof CharacterPayload>(
    key: K,
    value: CharacterPayload[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const name = form.name?.trim() ?? "";
    if (!name) {
      setError("Name required");
      return;
    }

    const payload: CharacterPayload = {
      ...form,
      name,
      klasse: form.klasse ? form.klasse : null,
    };

    try {
      await createCharacter(payload).unwrap();
      navigate("/Charakters");
    } catch (err: unknown) {
      console.error("Create character failed", err);
      let message = "Speichern fehlgeschlagen";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      setError(message);
    }
  }

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 520, margin: "24px auto", display: "grid", gap: 12 }}
    >
      <h2>Neuen Charakter anlegen</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <label style={{ display: "grid", gap: 4 }}>
        <span>Name *</span>
        <input
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        <span>Klasse</span>
        <input
          value={form.klasse ?? ""}
          onChange={(e) => updateField("klasse", e.target.value)}
          placeholder="z.B. Krieger, Magier"
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        <span>Strength</span>
        <input
          type="number"
          min={1}
          max={5}
          value={form.strength ?? 0}
          onChange={(e) => updateField("strength", Number(e.target.value))}
        />
      </label>

      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "4px",
        }}
      >
        <legend>Strength Fertigkeiten</legend>
        <div style={{ display: "grid", gap: 8 }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Kraft</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.might ?? 1}
              onChange={(e) => updateField("might", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Ausdauer</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.endurance ?? 1}
              onChange={(e) => updateField("endurance", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Nahkampf</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.melee ?? 1}
              onChange={(e) => updateField("melee", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Handwerk</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.crafting ?? 1}
              onChange={(e) => updateField("crafting", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
        </div>
      </fieldset>

      <label style={{ display: "grid", gap: 4 }}>
        <span>Dexterity</span>
        <input
          type="number"
          min={1}
          max={5}
          value={form.dexterity ?? 0}
          onChange={(e) => updateField("dexterity", Number(e.target.value))}
        />
      </label>

      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "4px",
        }}
      >
        <legend>Dexterity Fertigkeiten</legend>
        <div style={{ display: "grid", gap: 8 }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Heimlichkeit</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.stealth ?? 1}
              onChange={(e) => updateField("stealth", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Fingerfertigkeit</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.sleightOfHand ?? 1}
              onChange={(e) =>
                updateField("sleightOfHand", Number(e.target.value))
              }
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Bewegen</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.move ?? 1}
              onChange={(e) => updateField("move", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Fernkampf</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.ranged ?? 1}
              onChange={(e) => updateField("ranged", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
        </div>
      </fieldset>

      <label style={{ display: "grid", gap: 4 }}>
        <span>Intelligence</span>
        <input
          type="number"
          min={1}
          max={5}
          value={form.intelligence ?? 0}
          onChange={(e) => updateField("intelligence", Number(e.target.value))}
        />
      </label>

      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "4px",
        }}
      >
        <legend>Intelligence Fertigkeiten</legend>
        <div style={{ display: "grid", gap: 8 }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Wissen</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.knowledge ?? 1}
              onChange={(e) => updateField("knowledge", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Überleben</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.survival ?? 1}
              onChange={(e) => updateField("survival", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Menschenkenntnis</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.insight ?? 1}
              onChange={(e) => updateField("insight", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
        </div>
      </fieldset>

      <label style={{ display: "grid", gap: 4 }}>
        <span>Empathy</span>
        <input
          type="number"
          min={1}
          max={5}
          value={form.empathy ?? 0}
          onChange={(e) => updateField("empathy", Number(e.target.value))}
        />
      </label>

      <fieldset
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "4px",
        }}
      >
        <legend>Empathy Fertigkeiten</legend>
        <div style={{ display: "grid", gap: 8 }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Manipulation</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.manipulation ?? 1}
              onChange={(e) =>
                updateField("manipulation", Number(e.target.value))
              }
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Darbietung</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.performance ?? 1}
              onChange={(e) =>
                updateField("performance", Number(e.target.value))
              }
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Heilen</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.healing ?? 1}
              onChange={(e) => updateField("healing", Number(e.target.value))}
              style={{ width: "60px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Tierkunde</span>
            <input
              type="number"
              min={0}
              max={5}
              value={form.animalHandling ?? 1}
              onChange={(e) =>
                updateField("animalHandling", Number(e.target.value))
              }
              style={{ width: "60px" }}
            />
          </label>
        </div>
      </fieldset>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Speichert..." : "Anlegen"}
      </button>
    </form>
  );
}
