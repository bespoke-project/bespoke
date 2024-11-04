export const errorHandler = (err, req, res, next) => {
  // Den Stacktrace des Fehlers für Debugging loggen
  console.log(err.stack);

  // Ergebnis: JSON-Antwort mit dem Fehlerstatus und der Fehlermeldung
  return res.status(err.statusCode || 500).json({ Error: err.message });
};

export default errorHandler;
