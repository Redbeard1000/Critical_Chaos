import { Router } from "express";
import { CharactersRepository } from "./CharactersRepository.js";
import { CharactersService } from "./CharactersService.js";

export const charactersRouter = Router();

charactersRouter.get("/", async (req, res) => {
  const service = new CharactersService(new CharactersRepository());
  const characters = await service.getAllCharacters();
  res.json(characters);
});
