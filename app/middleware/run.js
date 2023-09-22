import { nanoid } from 'nanoid';
import { writeCache } from './cache.js';

const id = nanoid();
const EXPIRATION_TIME = 5;

const run = (handler) => {
  return async (req, res, next) => {
    try {
      const [response, expTime] = await handler(req, res, next);
      if (expTime !== 0) {
        console.log(`req url: ${req.originalUrl}`);
        await writeCache(req.originalUrl, JSON.stringify(response), expTime || EXPIRATION_TIME);
      }
      res.setHeader('X-API-Id', id)
      res.status(!!response ? 200 : 204).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default run;
