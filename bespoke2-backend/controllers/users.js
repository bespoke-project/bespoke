// Diese Datei wird derzeit nicht verwendet. Stattdessen alles direkt in auth.js
// TODO: Später (und erst dann) wegräumen.

import pool from '../db/connection.js'; // Dateiendung .js muss bei Express hinzugefügt werden, wenn nicht automatisch übertragen!

//Alle Daten von der Datenbank (all data from users)
export const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT * 
        FROM bespoke_users
        WHERE user_note1 NOT LIKE 'DBTest%' OR user_note1 IS NULL;`
    );
    // Wenn user_note1 mit DBTest beginnt, wird der Datensatz nicht mit aufgeführt
    res.json(result.rows);
  } catch (error) {
    // console.log("crud:", error.stack); //Diese Error-Function wird duch die errorHandler-MW ersetzt.
    // res.status(500).json({ message: "something broke" }); //Diese Error-Function wird durch die errorHandler-MW ersetzt.
    next(error); // Weitergabe an errorHandler-MW
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const result = await pool.query(`SELECT * FROM bespoke_users WHERE user_id = ${id}`);
    // Syntax mit besserer Absicherung gegen SQL-Injection; $1 ist Platzhalter für das, was wir einfügen wollen
    const result = await pool.query('SELECT * FROM bespoke_users WHERE user_id = $1', [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//  Validierung auf Datenbankebene: Type und für user_id und loginname gilt not null.  
//  TODO (Implementierung Authentifizierung): passwort in Datenbank mit not null   (momentan weggelassen, um tests usw. damit zu vereinfachen)
//  TODO evtl. zusätzlich Validierung mit express-validator, check('loginname').notEmpty().withMessage('Loginname is required'), usw
export const addNewUser = async (req, res, next) => {
  const { loginname, user_displayname, password, user_note1 } = req.body;
  // const {id} = req.params;
  try {
    const result = await pool.query(
      'INSERT INTO bespoke_users (loginname, user_displayname, password, user_note1) VALUES ($1, $2, $3, $4) RETURNING *',
      [loginname, user_displayname, password, user_note1]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { loginname, user_displayname, password, user_note1 } = req.body;
  try {
    const result = await pool.query(
      'UPDATE bespoke_users SET loginname = $1, user_displayname = $2, password = $3, user_note1 = $4 WHERE user_id = $5 RETURNING *',
      [loginname, user_displayname, password, user_note1, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bespoke_users WHERE user_id = $1', [id]);
    res.json({ message: `User with the User ID ${id} was deleted` });
  } catch (error) {
    next(error);
  }
};

//
// controllers/users.js       SQL // wird importiert von:
// routers/usersRouter.js     Unterrouten usersRouter.route('/').get(getAllUsers)...; // wird importiert von:
// (server) index.js          Hauptroute app.use("/users", usersRouter);
