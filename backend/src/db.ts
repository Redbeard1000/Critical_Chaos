import { Pool, type QueryResultRow } from "pg";

const pool = new Pool({
  host: process.env.POSTGRES_HOST || process.env.PGHOST || "localhost",
  port: Number(process.env.POSTGRES_PORT || process.env.PGPORT || 5432),
  user: process.env.POSTGRES_USER || process.env.PGUSER,
  password: process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD,
  database: process.env.POSTGRES_DB || process.env.PGDATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
});

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
) {
  const res = await pool.query<T>(text, params);
  return res.rows;
}

export async function testConnection() {
  const res = await pool.query("SELECT * FROM characters;");
  return res.rows;
}

export default pool;
