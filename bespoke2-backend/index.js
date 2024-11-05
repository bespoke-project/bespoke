import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postsRouter.js';
import cookieParser from 'cookie-parser';
// import "./db/connection.js";
import './db/server.js';
// // wichtig (bei Express): bei Scripteinbidnung immer Dateiendung .js angeben

// Modularizing the code ...
// import tokensRouter from "./routes/tokensRouter.js"

// aktuell andere Konstellation "aktiv", via authRouter.js
// import usersRouter from "./routers/usersRouter.js";

// Axios wird statt fetch verwendet, um die externe API effizient und unkompliziert abzurufen:
// - Automatisches JSON-Parsing der Antwort (Code kürzer und lesbarer)
// - Einfachere und spezifischere Fehlerbehandlung  ("error.response" mit *.status, *.data, *.headers),
// - Timeout-Konfiguration für stabile API-Anfragen,  z.B. axios.get('https://api.example.com/apiA', { timeout: 5000 })
// - Bietet eine einheitliche Syntax für HTTP-Methoden (GET, POST, etc.),
// - Vereinfacht die Nutzung von Headers, wichtig bei Authentifizierungsmechanismen
// Hinweis: Axios wird nicht für Datenbankabfragen verwendet – das übernimmt Sequelize. Axios und Sequelize können (zumindest theoretisch) gemeinsam verwendet werden.
import axios from 'axios';

const app = express();
const PORT = 8202;

// Middleware
// JSON-Body-Parser, Cors, Error-Handler,

app.use(express.json()); // Body-Parser for POST-REQUESTS w/ JSON-Payloads, ein MUSS für POST-Requests
app.use(errorHandler);
app.use(cookieParser());
// app.use(cors()); // Ermöglicht dem Frontend, HTTP-Anfragen von einer anderen Domain an den Server zu senden (Cross-Origin Resource Sharing)
// // TODO: ASK #security: Welche URI ergänzen wir hier bei bespoke konkret?
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Routes
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

// Modularizing the code ...
// Routes fuer Dateninput
// app.use("/tokens-t1", tokensRouter);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`Hello, World! ¡Hola Mundo! Hallo Welt! <br>
        Willkommen bei der bespoke-API.`);
});

// app.use("/users", usersRouter);

// TODO: später ggf. in routers/tokensRouter.js usw., hier mit "-t1" erstmal als Test aufbauen
// API A funktioniert
// TODO: Umgang mit Delay
app.get('/tokens-t1', async (req, res) => {
  try {
    // API A, Liste
    const responseA = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    const tokensList = responseA.data;
    res.json(tokensList);
  } catch (error) {
    // TODO Question, Testen: next(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// TODO: später ggf. in routers/tokensRouter.js usw., hier mit "-t1" erstmal als Test aufbauen
// Beispiel  http://localhost:8202/tokens-t1/...
// API B funktioniert
app.get('/tokens-t1/:id', async (req, res) => {
  const tokenId = req.params.id;

  try {
    // API B, Details anhand id
    const responseB = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}`
    );
    const tokenDetails = responseB.data;

    res.json(tokenDetails);
  } catch (error) {
    // TODO Question, Testen: next(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// TODO: später ggf. in routers/tokensRouter.js usw., hier mit "-t1" erstmal als Test aufbauen
// Beispiel  http://localhost:8202/token-combo-t1/...
// Funktioniert :-)
app.get('/tokens-combo-t1/:id', async (req, res) => {
  const tokenId = req.params.id;
  console.log(`tokenID: ${tokenId}`);

  try {
    // API A, Liste
    const responseA = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    const tokensList = responseA.data;

    // Token in verschachtelter Struktur finden
    // TODO Klammer {}
    const tokenFromList = Object.values(tokensList).find(
      (item) => item.id === tokenId
    );

    if (!tokenFromList) {
      return res
        .status(404)
        .json({ error: 'Token nicht in der Liste gefunden' });
    }

    // API B, Details anhand id
    const responseB = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}`
    );
    const tokenDetails = responseB.data;

    const combinedData1 = {
      ...tokenDetails, // Alle Daten aus API B
      nameFromListA: tokenFromList.name, // Daten von API A in Kombi mit
    };

    // TODO mehrere
    // const combinedData1 = {
    //     ...tokenDetails,   // Alle Daten aus API B
    //     nameFromListA: tokenFromList.name   // Daten von API A in Kombi mit
    // };

    // Kombinierte Daten
    res.json(combinedData1);
  } catch (error) {
    next(error);
  }
});

// Funktioniert :-)
app.get('/tokens-t2/:id', async (req, res) => {
  const tokenId = req.params.id;
  // Zum Testen mit festem Wert bitcoin
  //const tokenId = 'bitcoin'

  try {
    // API C, anhand id Marktwert in US-Dollar, 30 Tage Zeitverlauf.
    const responseC = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=30`
    );
    const tokenDetails = responseC.data;

    res.json(tokenDetails);
  } catch (error) {
    next(error);
  }
});

// Server starten
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
// });
// // TODO ASK: Wie vermeiden? [nodemon] app crashed - waiting for file changes before starting...
// // Ende index.js
