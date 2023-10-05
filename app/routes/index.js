import Router from 'express';
import metarApi from './metar.js';
import quoteApi from './quote.js';
import spaceflightNewsApi from './spaceflightNews.js';
import increment from "./increment.js";
import {readCache} from "../middleware/cache.js";
import run from "../middleware/run.js";

const router = Router();

router.use('/quote', quoteApi);
router.get('/ping', run((req, res, next) => {
  return [{ping: 'pong'}, 0];
}));
router.use(readCache);
router.use('/metar', metarApi);
router.use('/spaceflight_news', spaceflightNewsApi);
router.use('/increment', increment);

export default router;
