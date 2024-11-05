// API umgehen mit lokaler Datei von responseA (via wget in data/...)
import fs from 'fs/promises'; // fs für den Zugriff auf das Dateisystem 
import { Asset } from '../models/Assets.js'; // DB-Modell für die Stammdaten, inkl. DB-Verbindung
import pLimit from 'p-limit';
// import { testing } from './test.js';
import { apicoins } from './api-coins-list-const.js';

const limit = pLimit(10); // Begrenzung auf 10 gleichzeitige Promises
async function fetchBaseData() {
    try {
        // Statt API-Abfrage die lokale Datei lesen
        // const data = testing;
        const jsonDataA = apicoins;
        // const jsonData = data
        // Nur die ersten Einträge auswählen, um die Last zu testen
        return jsonDataA.slice(0, 20);
    } catch (error) {
        error.message = `Fehler beim Abrufen der Basis-Stammdaten (via Datei): ${error.message}`;
        throw error;
    }
}
// Basisstammdaten abrufen, responseA
// async function fetchBaseData() {
//     try {
//         // Statt API-Abfrage die lokale Datei lesen
//         const data = await fs.readFile('./api-coins-list.json', 'utf-8');
//         const jsonDataA = JSON.parse(data);
//         // Nur die ersten Einträge auswählen, um die Last zu testen
//         return jsonDataA.slice(0, 10);
//     } catch (error) {
//         error.message = `Fehler beim Abrufen der Basis-Stammdaten (via Datei): ${error.message}`;
//         throw error;
//     }
// }

// // Basisstammdaten abrufen, responseA
// async function fetchBaseData() {
//     try {
//         const responseA = await axios.get('https://api.coingecko.com/api/v3/coins/list')
//         // return responseA.data;
//         // Nur die ersten 10 Assets auswählen
//         return responseA.data.slice(0, 1);
//     } catch (error) {
//         error.message = `Fehler beim Abrufen der Basis-Stammdaten: ${error.message}`;
//         throw error; 
//     }
// }

export async function fetchAndStoreDailyDataA1(req, res, next) {
    try {
        const baseData = await fetchBaseData();

        // Speichern der Daten in der Datenbank
        for (const asset of baseData) {
            // await Asset.upsert({
                await Asset.create({
                asset_id: asset.id,
                asset_name: asset.name,
            });
            console.log(asset);
        }

        res.status(200).json({ message: 'Daten erfolgreich abgerufen und gespeichert.' });
    } catch (error) {
        console.error('Fehler beim Testen der Funktion:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen und Speichern der Daten.' });
    }
}
