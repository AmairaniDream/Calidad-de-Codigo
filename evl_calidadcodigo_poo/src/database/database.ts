import { Pool } from "pg";

const pool = new Pool({
  user: "PostgreDemo",
  host: "localhost",
  database: "library",
  password: "Postgr301",
  port: 5432,
});

export default pool;
