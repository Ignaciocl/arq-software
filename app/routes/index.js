import Router from 'express';
import metarApi from './metar.js';
import quoteApi from './quote.js';

const router = Router();
router.get('/ping', (req, res) => res.send('pong'));
router.use('/metar', metarApi);
router.use('/quote', quoteApi);

export default router;
