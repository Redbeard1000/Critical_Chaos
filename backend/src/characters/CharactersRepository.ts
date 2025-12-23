import { query } from "../db.js";
import type { CharacterInput } from "./CharakterTypes.js";

export class CharactersRepository {
  private static initPromise: Promise<void> | null = null;

  constructor() {
    if (!CharactersRepository.initPromise) {
      CharactersRepository.initPromise = this.ensureTable();
    }
  }

  private async ensureReady() {
    if (CharactersRepository.initPromise) {
      await CharactersRepository.initPromise;
    }
  }

  private async ensureTable() {
    // Create table with common RPG-ish fields if it does not exist yet
    await query(`
      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        klasse TEXT,
        strength INT,
        dexterity INT,
        intelligence INT,
        empathy INT,
        level INT,
        might INT,
        endurance INT,
        melee INT,
        crafting INT,
        stealth INT,
        "sleightOfHand" INT,
        move INT,
        ranged INT,
        knowledge INT,
        survival INT,
        insight INT,
        manipulation INT,
        performance INT,
        healing INT,
        "animalHandling" INT,
        metadata JSONB
      );
    `);
  }

  async findAll() {
    await this.ensureReady();
    return query("SELECT * FROM characters ORDER BY id DESC;");
  }

  async findById(id: string) {
    await this.ensureReady();
    const results = await query("SELECT * FROM characters WHERE id = $1;", [
      id,
    ]);
    return results[0];
  }

  async create(data: CharacterInput) {
    await this.ensureReady();
    const {
      name,
      klasse = null,
      strength = null,
      dexterity = null,
      intelligence = null,
      empathy = null,
      level = null,
      might = null,
      endurance = null,
      melee = null,
      crafting = null,
      stealth = null,
      sleightOfHand = null,
      move = null,
      ranged = null,
      knowledge = null,
      survival = null,
      insight = null,
      manipulation = null,
      performance = null,
      healing = null,
      animalHandling = null,
      metadata = null,
    } = data;

    const results = await query(
      `INSERT INTO characters
        (name, klasse, strength, dexterity, intelligence, empathy, level, 
         might, endurance, melee, crafting, stealth, "sleightOfHand", move, ranged,
         knowledge, survival, insight, manipulation, performance, healing, "animalHandling", metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
       RETURNING *;`,
      [
        name,
        klasse,
        strength,
        dexterity,
        intelligence,
        empathy,
        level,
        might,
        endurance,
        melee,
        crafting,
        stealth,
        sleightOfHand,
        move,
        ranged,
        knowledge,
        survival,
        insight,
        manipulation,
        performance,
        healing,
        animalHandling,
        metadata,
      ]
    );
    return results[0];
  }

  async update(id: string, data: Partial<CharacterInput>) {
    await this.ensureReady();
    const existing = await this.findById(id);
    if (!existing) return null;

    const {
      name = existing.name,
      klasse = existing.klasse,
      strength = existing.strength,
      dexterity = existing.dexterity,
      intelligence = existing.intelligence,
      empathy = existing.empathy,
      level = existing.level,
      might = existing.might,
      endurance = existing.endurance,
      melee = existing.melee,
      crafting = existing.crafting,
      stealth = existing.stealth,
      sleightOfHand = existing.sleightOfHand,
      move = existing.move,
      ranged = existing.ranged,
      knowledge = existing.knowledge,
      survival = existing.survival,
      insight = existing.insight,
      manipulation = existing.manipulation,
      performance = existing.performance,
      healing = existing.healing,
      animalHandling = existing.animalHandling,
      metadata = existing.metadata,
    } = data;

    const results = await query(
      `UPDATE characters
         SET name = $1,
         klasse = $2,
         strength = $3,
         dexterity = $4,
         intelligence = $5,
         empathy = $6,
         level = $7,
         might = $8,
         endurance = $9,
         melee = $10,
         crafting = $11,
         stealth = $12,
         "sleightOfHand" = $13,
         move = $14,
         ranged = $15,
         knowledge = $16,
         survival = $17,
         insight = $18,
         manipulation = $19,
         performance = $20,
         healing = $21,
         "animalHandling" = $22,
         metadata = $23
       WHERE id = $24
       RETURNING *;`,
      [
        name,
        klasse,
        strength,
        dexterity,
        intelligence,
        empathy,
        level,
        might,
        endurance,
        melee,
        crafting,
        stealth,
        sleightOfHand,
        move,
        ranged,
        knowledge,
        survival,
        insight,
        manipulation,
        performance,
        healing,
        animalHandling,
        metadata,
        id,
      ]
    );
    return results[0];
  }

  async delete(id: string) {
    await this.ensureReady();
    const results = await query(
      "DELETE FROM characters WHERE id = $1 RETURNING *;",
      [id]
    );
    return results[0];
  }
}
