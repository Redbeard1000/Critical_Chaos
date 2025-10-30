import express from "express";
import cors from "cors";
import { testConnection } from "./db.js";
import { charactersRouter } from "./characters/CharactersRouter.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/characters", charactersRouter);

app.listen(3000);
