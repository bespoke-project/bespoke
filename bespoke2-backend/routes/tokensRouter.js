// TODO: Modularizing the code ...
import { Router } from "express";
// import * as tokensController from "../controllers/tokensAPI.js";
// import { getTokenList as tokensController } from "../controllers/tokensAPI.js";
import { getTokenList } from "../controllers/tokensAPI.js";

const tokensRouter = Router();

// Hier wird der Routenteil definiert, der ab /tokens/ kommt. (Siehe server/index.js), also "Unterroutes"
tokensRouter.route('/').get('/tokens-t1', getTokenList);
//tokensRouter.route('/:id').get('/tokens-t1', tokensController.getTokenById);

export default tokensRouter


// // exTODO: später ggf. in routers/tokensRouter.js usw., hier mit "-t1" erstmal als Test aufbauen
// // Beispiel  http://localhost:8202/tokens-t1/...
// // API B funktioniert
// app.get('/tokens-t1/:id', async (req, res) => {
//     const tokenId = req.params.id;

//     try {
//         // API B, Details anhand id
//         const responseB = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`);
//         const tokenDetails = responseB.data;

//         res.json(tokenDetails);

//     } catch (error) {
//         // TODO Question, Testen: next(error);
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// });



// // TODO: später ggf. in routers/tokensRouter.js usw., hier mit "-t1" erstmal als Test aufbauen
// // Beispiel  http://localhost:8202/token-combo-t1/...
// // Funktioniert :-)
// app.get('/tokens-combo-t1/:id', async (req, res) => {
//     const tokenId = req.params.id;
//     console.log(`tokenID: ${tokenId}`);

//     try {
//         // API A, Liste
//         const responseA = await axios.get('https://api.coingecko.com/api/v3/coins/list');
//         const tokensList = responseA.data;

//         // Token in verschachtelter Struktur finden
//         // TODO Klammer {}
//         const tokenFromList = Object.values(tokensList).find(item =>
//             item.id === tokenId
//         );

//         if (!tokenFromList) {
//             return res.status(404).json({ error: 'Token nicht in der Liste gefunden' });
//         }

//         // API B, Details anhand id
//         const responseB = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`);
//         const tokenDetails = responseB.data;

//         const combinedData1 = {
//             ...tokenDetails,   // Alle Daten aus API B
//             nameFromListA: tokenFromList.name   // Daten von API A in Kombi mit
//         };

//         // TODO mehrere
//         // const combinedData1 = {
//         //     ...tokenDetails,   // Alle Daten aus API B
//         //     nameFromListA: tokenFromList.name   // Daten von API A in Kombi mit
//         // };

//         // Kombinierte Daten
//         res.json(combinedData1);

//     } catch (error) {
//         // TODO Question, Testen: next(error);
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// });