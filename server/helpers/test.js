import fs from "node:fs";
import path from "node:path";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db.js";

const __dirname = import.meta.dirname;

const initializeTestToDb = async () => {
  const sql = fs.readFileSync(path.join(__dirname, "../todo.sql"), "utf8");
  await pool.query(sql);
};

const insertTestUser = async (email, password) => {
  const hashedPassword = await hash(password, 10);
  await pool.query("INSERT INTO account (email, password) VALUES ($1, $2)", [
    email,
    hashedPassword,
  ]);
};

const getToken = async (email) => {
  return jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET_KEY
  );
};
export { initializeTestToDb, insertTestUser, getToken };
