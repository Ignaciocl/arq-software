const run = (handler) => {
  return async (req, res, next) => {
    try {
      const response = await handler(req, res, next);
      res.status(!!response ? 200 : 204).json(response);

    } catch (e) {
      next(e);
    }
  }
}

export default run;
