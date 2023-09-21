import { nanoid } from 'nanoid';
import { write_cache } from './cache';

const id = nanoid();
const EXPIRATION_TIME = 5;

const run = (handler) => {
  return async (req, res, next) => {
    try {
      const response = await handler(req, res, next);
      write_cache(req.originalUrl, response, EXPIRATION_TIME);
      res.setHeader('X-API-Id', id)
      res.status(!!response ? 200 : 204).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default run;
