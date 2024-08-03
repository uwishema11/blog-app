const errorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    message: err.message,
  });
};

export default errorHandler;
