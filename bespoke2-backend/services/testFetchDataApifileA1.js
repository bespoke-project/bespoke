// testFetchData.js
import { fetchAndStoreDailyDataA1 } from './fetchDailyAssetsApifileA1.js';
//import '../db/server.js';
//import  sequelize  from '../db/server.js';

import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

function maskSensitiveInfo(url) {
  return url.replace(/\/\/(.*?):(.*?)@/, '//***:***@');
}

// new Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: console.log, // Alle SQL-Queries werden im Log ausgegeben // Debug
  define: {
    freezeTableName: true,
  },
});
console.log('DATABASE_URL:', maskSensitiveInfo(process.env.DATABASE_URL));

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the NEON");

    // Synchronisiere alle Modelle mit der Datenbank
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Fehler bei der DB-Verbindung:", error);
  }
};

(async () => {
  try {
    await connectDB();
    // Verbindung zur Datenbank herstellen
    // await sequelize.authenticate();
    console.log('Datenbankverbindung erfolgreich.');

    // Die Funktion manuell ausführen
    await fetchAndStoreDailyDataA1();
    console.log('fetchAndStoreDailyDataA1 erfolgreich abgeschlossen.');
  } catch (error) {
    console.error('Fehler beim Testen der Funktion:', error.message);
  } finally {
    // Datenbankverbindung schließen
    try {
      await sequelize.close();
      console.log('Datenbankverbindung geschlossen.');
    } catch (closeError) {
      console.error('Fehler beim Schließen der Datenbankverbindung:', closeError.message);
    }
    }
})();
