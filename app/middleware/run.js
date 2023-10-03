import { nanoid } from 'nanoid';
import {finishTracking, log, startTracking} from "./tracking.js";

const id = nanoid();

const run = (handler) => {
  return async (req, res, next) => {
    startTracking(req);
    const path = req.originalUrl.split('?')[0];
    try {
      const t = Date.now();
      const logNaming = path.split('/')[1];
      const [response, expTime] = await handler(req, res, next);
      log(req, `external_api.${logNaming}`, t);
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
