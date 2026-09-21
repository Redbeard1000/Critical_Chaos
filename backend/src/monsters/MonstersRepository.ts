import { query } from "../db.js";
import type { MonsterInput } from "./MonsterTypes.js";

export class MonstersRepository {
  private static initPromise: Promise<void> | null = null;

  constructor() {
    if (!MonstersRepository.initPromise) {
      MonstersRepository.initPromise = this.ensureTable();
    }
  }

  private async ensureReady() {
    if (MonstersRepository.initPromise) await MonstersRepository.initPromise;
  }

  private async ensureTable() {
    await query(`
      CREATE TABLE IF NOT EXISTS monsters (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        strength INT NOT NULL,
        dexterity INT NOT NULL,
        armor INT NOT NULL,
        might INT NOT NULL,
        endurance INT NOT NULL,
        melee INT NOT NULL,
        crafting INT NOT NULL,
        stealth INT NOT NULL,
        "sleightOfHand" INT NOT NULL,
        move INT NOT NULL,
        ranged INT NOT NULL,
        attacks JSONB NOT NULL
      );
    `);
  }

  async findAll() {
    await this.ensureReady();
    return query("SELECT * FROM monsters ORDER BY id DESC;");
  }

  async create(data: MonsterInput) {
    await this.ensureReady();
    const results = await query(
      `INSERT INTO monsters
        (name, strength, dexterity, armor, might, endurance, melee, crafting,
         stealth, "sleightOfHand", move, ranged, attacks)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *;`,
      [
        data.name,
        data.strength ?? 1,
        data.dexterity ?? 1,
        data.armor ?? 0,
        data.might ?? 0,
        data.endurance ?? 0,
        data.melee ?? 0,
        data.crafting ?? 0,
        data.stealth ?? 0,
        data.sleightOfHand ?? 0,
        data.move ?? 0,
        data.ranged ?? 0,
        JSON.stringify(data.attacks),
      ],
    );
    return results[0];
  }
}
