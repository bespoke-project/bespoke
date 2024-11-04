// aufrufbar mit node script.js
import fetch from 'node-fetch';
import { createObjectCsvWriter } from 'csv-writer';
//import axios from 'axios';

// Daten von API holen

// async function fetchDetailData2(assetId) {
//     try {
//         // const responseCsv1 = await axios.get(`https://api.coingecko.com/api/v3/coins/${assetId}`);
//         const responseCsv1 = await axios.get(`https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=30`);
//         return responseCsv1.data;
//     } catch (error) {
//         error.message = `Fehler beim Abrufen der Marktdaten für Asset ${assetId}: ${error.message}`;
//         throw error;
//     }
// }
async function fetchDataFromAPI() {
  const assetId = 'bitcoin';  // Hardcodiert für jetzt, Achtung unten nochmal manuell
  // API mit Markdaten von assetId in US-Dollar, Zeitraum: 30 Tage
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=30`);
  if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data.prices;  // Extrahiere den relevanten Teil (wie result). Die API hat 3 verschachtelte Ebenen!  prices | jeweils Index ab 0 fuer Zeitpunkt | Array mit Zeitstempel und Preis
}

// In CSV-Datei schreiben
async function writeDataToCSV(data, assetId) {
  // Daten in das passende Format für dyngraph formatieren
  const csvData = data.map(([timestamp, price]) => ({
      Zeit: timestamp.toString(),  // Zeitstempel als einfachen String behalten
      [assetId]: price  // Preis mit dynamischer Spaltenüberschrift für das Asset
  }));

  // Erstelle die CSV-Datei
  const csvWriter = createObjectCsvWriter({
      path: `./data/data-01-${assetId}.csv`,
      header: [
          { id: 'Zeit', title: 'Zeit' },
          { id: assetId, title: assetId }  // Dynamische Spaltenüberschrift
      ]
  });

  // Schreibe die Daten in die CSV-Datei
  await csvWriter.writeRecords(csvData);
  console.log('Daten erfolgreich in CSV-Datei geschrieben');
}


// Funktion aufrufen mit bitcoin-Beispiel
(async () => {
  try {
      const data = await fetchDataFromAPI();
      await writeDataToCSV(data, 'bitcoin');
  } catch (error) {
      console.error('Fehler:', error);
  }
})();



// mit Shebang direkt von Bash (chmod +x script.js)
// "normal" (Node.js-Script) mit node script.js
// mit optionalem export default Foo in letzter Zeile muss es dann in separatem (Hilfs-)Script importiert und aufgerufen werden

