import { Button, Card, CardContent, Divider, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../store/enhancedApi";

export default function CharacterDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetCharacterQuery(id as string, {
    skip: !id,
  });

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Zurück
        </Button>
        <h1 style={{ margin: 0 }}>Charakter</h1>
      </Stack>

      {isLoading && <div>Lade Charakter...</div>}
      {error && (
        <div style={{ color: "red" }}>
          Konnte Charakter nicht laden. Bitte erneut versuchen.
        </div>
      )}
      {!isLoading && !error && !data && (
        <div style={{ color: "red" }}>Charakter nicht gefunden.</div>
      )}

      {data && (
        <Card elevation={1}>
          <CardContent style={{ display: "grid", gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{data.name}</div>
              {data.klasse && (
                <div style={{ color: "#666" }}>Klasse: {data.klasse}</div>
              )}
              <div style={{ color: "#666" }}>ID: {data.id}</div>
            </div>

            <Divider />

            <section style={{ display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 600 }}>Attribute</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 8,
                }}
              >
                <Stat label="Strength" value={data.strength} />
                <Stat label="Dexterity" value={data.dexterity} />
                <Stat label="Intelligence" value={data.intelligence} />
                <Stat label="Empathy" value={data.empathy} />
                <Stat label="Level" value={data.level} />
              </div>
            </section>

            <Divider />

            <section style={{ display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 600 }}>Fertigkeiten</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 8,
                }}
              >
                <Stat label="Kraft" value={data.might} />
                <Stat label="Ausdauer" value={data.endurance} />
                <Stat label="Nahkampf" value={data.melee} />
                <Stat label="Handwerk" value={data.crafting} />
                <Stat label="Heimlichkeit" value={data.stealth} />
                <Stat label="Fingerfertigkeit" value={data.sleightOfHand} />
                <Stat label="Bewegen" value={data.move} />
                <Stat label="Fernkampf" value={data.ranged} />
                <Stat label="Wissen" value={data.knowledge} />
                <Stat label="Überleben" value={data.survival} />
                <Stat label="Menschenkenntnis" value={data.insight} />
                <Stat label="Manipulation" value={data.manipulation} />
                <Stat label="Performance" value={data.performance} />
                <Stat label="Heilung" value={data.healing} />
                <Stat label="Tierführung" value={data.animalHandling} />
              </div>
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: number | null }) {
  if (value === null || typeof value === "undefined") return null;
  return (
    <div
      style={{
        padding: "8px 10px",
        border: "1px solid #e0e0e0",
        borderRadius: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
