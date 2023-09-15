const errorHandler = async (err, req, res, next) => {
  const userMsg = {
    reason: err.message,
    endpoint: req.url,
  }
  res.status(err.status || 500).json(userMsg);
}

export default errorHandler;
