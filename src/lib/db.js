// This file is deprecated. The project now uses Supabase.
// See src/lib/supabase.js for the database client.
// See supabase-schema.sql for the database schema and seed data.

export default function getDb() {
  throw new Error(
    'SQLite (better-sqlite3) has been replaced with Supabase. Use import { supabase } from "@/lib/supabase" instead.'
  );
}
