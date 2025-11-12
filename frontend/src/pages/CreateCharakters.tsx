import React, { useState } from "react";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Props = { onCreated?: () => void };

export default function CreateCharacter({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [klasse, setKlasse] = useState("");
  const [strength, setStrength] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          klasse: klasse || null,
          strength,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
      }
      setName("");
      setKlasse("");
      setStrength(10);
      onCreated?.();
    } catch (err: unknown) {
      console.error("Submit error:", err);
      // Narrow the unknown to a useful message
      let message = "Create failed";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <h3>Neuen Charakter erstellen</h3>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Klasse"
          value={klasse}
          onChange={(e) => setKlasse(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ marginRight: 8 }}>Strength</label>
        <input
          type="number"
          value={strength}
          min={1}
          onChange={(e) => setStrength(Number(e.target.value))}
        />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? "Speichern..." : "Erstellen"}
        </button>
      </div>
    </form>
  );
}
