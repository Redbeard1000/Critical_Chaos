import { query } from "../db.js";

export class CharactersRepository {
  async findAll() {
    return query("SELECT * FROM characters;");
  }

  async findById(id: string) {
    const results = await query("SELECT * FROM characters WHERE id = $1;", [
      id,
    ]);
    return results[0];
  }

  async create(data: any) {
    const { name, klasse } = data;
    const results = await query(
      "INSERT INTO characters (name, klasse) VALUES ($1, $2) RETURNING *;",
      [name, klasse]
    );
    return results[0];
  }

  async update(id: string, data: any) {
    const { name, klasse } = data;
    const results = await query(
      "UPDATE characters SET name = $1, klasse = $2 WHERE id = $3 RETURNING *;",
      [name, klasse, id]
    );
    return results[0];
  }

  async delete(id: string) {
    const results = await query(
      "DELETE FROM characters WHERE id = $1 RETURNING *;",
      [id]
    );
    return results[0];
  }
}
