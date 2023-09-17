import { nanoid } from 'nanoid';

const id = nanoid();

const run = (handler) => {
  return async (req, res, next) => {
    try {
      const response = await handler(req, res, next);
      res.setHeader('X-API-Id', id)
      res.status(!!response ? 200 : 204).json(response);

    } catch (e) {
      next(e);
    }
  }
}

export default run;
