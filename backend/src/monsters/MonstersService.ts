import { MonstersRepository } from "./MonstersRepository.js";
import type { MonsterInput } from "./MonsterTypes.js";

export class MonstersService {
  constructor(private readonly repository: MonstersRepository) {}

  async getAllMonsters() {
    return this.repository.findAll();
  }

  async createMonster(data: MonsterInput) {
    return this.repository.create(data);
  }
}
