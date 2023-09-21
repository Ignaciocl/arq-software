import Router from 'express';
import metarApi from './metar.js'
import increment from './increment.js'
import {readCache, writeCache} from '../middleware/cache.js'
const router = Router();

router.get('/ping', async (req, res) => (res.send("pong")));
router.use('/metar', metarApi)
router.use('/increment', readCache, increment, writeCache)

export default router;
