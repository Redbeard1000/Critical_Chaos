import { Button, Card, CardContent, Divider, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../store/enhancedApi";
import "../styles/characters.css";

export default function CharacterDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetCharacterQuery(id as string, {
    skip: !id,
  });

  return (
    <div className="character-sheet">
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Zurück
        </Button>
        <h1 className="character-form-title">Charakter</h1>
      </Stack>

      {isLoading && (
        <div className="character-info-loading">Lade Charakter...</div>
      )}
      {error && (
        <div className="character-info-error">
          Konnte Charakter nicht laden. Bitte erneut versuchen.
        </div>
      )}
      {!isLoading && !error && !data && (
        <div className="character-info-not-found">
          Charakter nicht gefunden.
        </div>
      )}

      {data && (
        <Card elevation={1}>
          <CardContent className="character-content">
            <div className="character-header">
              <div className="character-name">{data.name}</div>
              {data.klasse && (
                <div className="character-class">Klasse: {data.klasse}</div>
              )}
            </div>

            <Divider />

            <section className="character-attributes">
              <div className="character-attributes-title">Attribute</div>
              <div className="attributes-grid">
                <Stat label="Strength" value={data.strength} />
                <Stat label="Dexterity" value={data.dexterity} />
                <Stat label="Intelligence" value={data.intelligence} />
                <Stat label="Empathy" value={data.empathy} />
              </div>
            </section>

            <Divider />

            <section className="character-skills">
              <div className="character-skills-title">Fertigkeiten</div>
              <div className="skills-grid">
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
    <div className="stat-box">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}
