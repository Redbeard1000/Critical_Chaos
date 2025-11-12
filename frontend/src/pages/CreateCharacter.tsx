import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CreateCharakter() {
  const [name, setName] = useState("");
  const [klasse, setKlasse] = useState("");
  const [strength, setStrength] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/characters/createCharacter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          klasse: klasse || null,
          strength,
        }),
      });

      const text = await res.text();
      let body: unknown;
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        body = text;
      }

      if (!res.ok) {
        const msg =
          body && typeof body === "object" && "error" in body
            ? (body as { error: unknown }).error
            : res.statusText;
        throw new Error(String(msg || "Create failed"));
      }

      // Erfolg: redirect oder clear form
      navigate("/"); // anpassen: Zielseite nach Erstellung
    } catch (err: unknown) {
      let message = "Create failed";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      setError(message);
      console.error("CreateCharakter error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 480, margin: "16px auto" }}>
      <h2>Neuen Charakter erstellen</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
