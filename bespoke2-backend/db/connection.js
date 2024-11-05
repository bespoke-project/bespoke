// DB-Verbindung ohne Sequelize, aktuell inaktiv
// TODO Schlussphase: Datei kann später weggeräumt werden; wird derzeit noch gebraucht.
import pg from "pg";
const { Pool } = pg;

// Wir brauchen immer ein Pool, um die Datenbankverbindung herzustellen
const pool = new Pool ({

    host: process.env.PGHOST, 
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: true },
})

// pool.connect(); würde reichen, aber besser als async-Funktion mit await und try/catch
const connectDB = async () => {
    try {
      await pool.connect();
      console.log("Connected to NeonPostgreSQL");
    } catch (error) {
      console.error("Connection error:", error.stack);
    }
  };
  
  connectDB();
  // Die Funktion wird dann in server/index.js mit Datei als Ganzes aufgerufen
  // import './db/connection.js' 
  // und damit ist die Verbindung zu Neon hergestellt
  
  export default pool;

  