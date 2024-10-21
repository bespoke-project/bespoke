import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import "./db/connection.js";
// wichtig (bei Express): bei Scripteinbidnung immer Dateiendung .js angeben
import usersRouter from "./routers/usersRouter.js";

const app = express();
const PORT = 8202;

// Middleware
// JSON-Body-Parser, Cors, Error-Handler,

app.use(express.json()); // Body-Parser for POST-REQUESTS w/ JSON-Payloads, ein MUSS für POST-Requests

app.use(cors());        // Ermöglicht dem Frontend, HTTP-Anfragen von einer anderen Domain an den Server zu senden (Cross-Origin Resource Sharing)
// TODO: #security: welche URI ergänzen wir hier bei bespoke konkret?  #miduda


app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`Hello, World! ¡Hola Mundo! Hallo Welt! <br> 
        Willkommen bei der bespoke-API.`);
});

app.use("/users", usersRouter);

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
});


