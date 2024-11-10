import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const environment = process.env.NODE_ENV;
const { Pool } = pkg;

const openDb = () => {
  // const pool = new Pool({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   database:
  //     environment === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT,
  // });

  const pool = new Pool({
    user: "postgres.srkqowulyzpuedbebuce",
    host: "aws-0-us-east-1.pooler.supabase.com",
    database: "postgres",
    password: "98iQ5jDwvcRxDrpz",
    port: 6543,
  });

  return pool;
};
const pool = openDb();
export default pool;
