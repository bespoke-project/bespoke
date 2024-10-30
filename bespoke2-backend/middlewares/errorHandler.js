export const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  return res.status(err.statusCode || 500).json({ Error: err.message });
};

export default errorHandler;
