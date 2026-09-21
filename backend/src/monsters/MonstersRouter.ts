import { Router } from "express";
import { MonstersRepository } from "./MonstersRepository.js";
import type { MonsterInput } from "./MonsterTypes.js";

export const monstersRouter = Router();
const repository = new MonstersRepository();

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function isValidAttackList(attacks: MonsterInput["attacks"]) {
  return (
    Array.isArray(attacks) &&
    attacks.length === 6 &&
    attacks.every(
      (attack) =>
        typeof attack?.name === "string" &&
        attack.name.trim() !== "" &&
        typeof attack.description === "string" &&
        typeof attack.diceCount === "number" &&
        Number.isInteger(attack.diceCount) &&
        attack.diceCount >= 5 &&
        attack.diceCount <= 20,
    )
  );
}

monstersRouter.get("/", async (_req, res) => {
  try {
    res.json(await repository.findAll());
  } catch (error: unknown) {
    res.status(500).json({ error: errorMessage(error) });
  }
});

monstersRouter.post("/", async (req, res) => {
  const payload = req.body as MonsterInput;
  if (!payload?.name || payload.name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!isValidAttackList(payload.attacks)) {
    return res
      .status(400)
      .json({ error: "Exactly six attacks with 5-20 W6 are required" });
  }

  try {
    res
      .status(201)
      .json(await repository.create({ ...payload, name: payload.name.trim() }));
  } catch (error: unknown) {
    res.status(500).json({ error: errorMessage(error) });
  }
});
