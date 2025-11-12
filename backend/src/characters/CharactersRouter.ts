import { Router } from "express";
import { CharactersRepository } from "./CharactersRepository.js";
import { CharactersService } from "./CharactersService.js";
import type { CharacterInput } from "./CharakterTypes.js";

export const charactersRouter = Router();

const repo = new CharactersRepository();
const svc = new CharactersService(repo);

function errMessage(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}

charactersRouter.get("/", async (_req, res) => {
  try {
    const rows = await svc.getAllCharacters();
    res.json(rows);
  } catch (e: unknown) {
    res.status(500).json({ error: errMessage(e) });
  }
});

charactersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) return res.status(400).json({ error: "invalid id" });

  try {
    const item = await svc.getCharacterById(id);
    if (!item) return res.status(404).json({ error: "not found" });
    res.json(item);
  } catch (e: unknown) {
    res.status(500).json({ error: errMessage(e) });
  }
});

// CreateCharacter -> POST /api/characters
charactersRouter.post("/", async (req, res) => {
  const payload = req.body as CharacterInput;
  if (!payload?.name || payload.name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const created = await svc.createCharacter(payload);
    res.status(201).json(created);
  } catch (e: unknown) {
    res.status(500).json({ error: errMessage(e) });
  }
});

charactersRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "invalid id" });

  const payload = req.body as Partial<CharacterInput>;
  try {
    const updated = await svc.updateCharacter(id, payload);
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  } catch (e: unknown) {
    res.status(500).json({ error: errMessage(e) });
  }
});

charactersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "invalid id" });

  try {
    const deleted = await svc.deleteCharacter(id);
    if (!deleted) return res.status(404).json({ error: "not found" });
    res.json(deleted);
  } catch (e: unknown) {
    res.status(500).json({ error: errMessage(e) });
  }
});
