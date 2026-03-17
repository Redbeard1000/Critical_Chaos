import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "../styles/BattleMap.css";

export const BattleMap = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState<string[]>([]);

  const handleAddName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setNames((prev) => [...prev, trimmed]);
    setName("");
  };

  return (
    <Box sx={{ p: 2 }}>
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
        <Button variant="contained" onClick={handleAddName}>
          Hinzufügen
        </Button>
      </Stack>
      <Stack spacing={1.5}>
        {names.map((entry, i) => (
          <Card className="battle-card" key={i}>
            <CardContent>
              <Typography variant="body2">{entry}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
