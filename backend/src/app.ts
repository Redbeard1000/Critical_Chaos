import express from "express";
import cors from "cors";
import { charactersRouter } from "./characters/CharactersRouter.js";
import db from "./db.js"; // optional: ensure db initialisation/import

const app = express();

app.use(cors());
app.use(express.json());

// mount characters router
app.use("/api/characters", charactersRouter);

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
