// testFetchData.js
import { fetchAndStoreDailyDataA1 } from './fetchDailyAssetsApifileA1.js';
import  sequelize  from '../db/server.js';

(async () => {
  try {
    // Verbindung zur Datenbank herstellen
    await sequelize.authenticate();
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
