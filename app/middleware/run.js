import { nanoid } from 'nanoid';
import { writeCache } from './cache.js';
import {finishTracking, log} from "./tracking.js";

const id = nanoid();
const EXPIRATION_TIME = 5;

const run = (handler) => {
  return async (req, res, next) => {
    const path = req.originalUrl.split('?')[0];
    try {
      const [response, expTime] = await handler(req, res, next);
      if (expTime !== 0) {
        await writeCache(req.originalUrl, JSON.stringify(response), expTime || EXPIRATION_TIME);
      }
      res.setHeader('X-API-Id', id)
      res.status(!!response ? 200 : 204).json(response);
      log(req, `success.${path.split('/')[1]}.200`)
    } catch (e) {
      next(e);
    }
    finishTracking(req, {path: path});
  }
}

export default run;
