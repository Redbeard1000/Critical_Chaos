import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import "../styles/BattleMap.css";

import { SkeletonIcon } from "../icons/customIcons";

type BattleEntry = {
  name: string;
  color: "red" | "green" | "blue";
  alive: boolean;
};

const STORAGE_KEY = "battle_entries";

export const BattleMap = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState<"red" | "green" | "blue">("red");
  const [entries, setEntries] = useState<BattleEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const [glowIndex, setGlowIndex] = useState(-1);

  const handleAddName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setEntries((prev) => [...prev, { name: trimmed, color, alive: true }]);
    setName("");
  };

  const handleGlow = () => {
    const aliveEntries = entries
      .map((_, i) => i)
      .filter((i) => entries[i].alive);

    if (aliveEntries.length === 0) return;

    const currentAliveIndex = aliveEntries.indexOf(glowIndex);
    const nextAliveIndex = (currentAliveIndex + 1) % aliveEntries.length;
    setGlowIndex(aliveEntries[nextAliveIndex]);
  };

  const toggleAlive = (index: number) => {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, alive: !entry.alive } : entry,
      ),
    );
  };

  return (
    <Box className="battle-box">
      <Typography variant="h4" gutterBottom>
        Kampf Runden
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddName();
          }}
        />
        <TextField
          select
          label="Farbe"
          value={color}
          onChange={(e) => setColor(e.target.value as "red" | "green" | "blue")}
        >
          <MenuItem value="red">Rot</MenuItem>
          <MenuItem value="green">Grün</MenuItem>
          <MenuItem value="blue">Blau</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleAddName}>
          Hinzufügen
        </Button>
      </Stack>
      <Stack spacing={1.5}>
        {entries.map((entry, i) => (
          <Card
            key={`${entry.name}-${i}`}
            className={`battle-card ${i === glowIndex ? "glow-active" : ""} ${
              entry.alive ? `battle-card-${entry.color}` : "battle-card-dead"
            }`}
          >
            <CardContent className="battle-card-content">
              <Typography
                variant="body2"
                className={
                  entry.alive ? "battle-card-name" : "battle-card-name is-dead"
                }
              >
                {entry.name}
              </Typography>
              <Button
                className="battle-button-dead"
                variant="outlined"
                onClick={() => toggleAlive(i)}
              >
                <SkeletonIcon sx={{ fontSize: 40 }} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={handleGlow}
        disabled={entries.length === 0}
        className="Battle-Button"
      >
        Runde starten
      </Button>
    </Box>
  );
};
