import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pool from '../config/database';

async function run(): Promise<void> {
  const sql = fs.readFileSync(path.join(__dirname, 'migration_v2.sql'), 'utf-8');
  try {
    await pool.query(sql);
    console.log('Migration v2 applied');
  } finally {
    await pool.end();
  }
}

run();
