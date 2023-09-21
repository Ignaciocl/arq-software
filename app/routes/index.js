import Router from 'express';
import metarApi from './metar.js';
import quoteApi from './quote.js';
import spaceflightNewsApi from './spaceflightNews.js';

const router = Router();
router.get('/ping', (req, res) => res.send('pong'));
router.use('/metar', metarApi);
router.use('/quote', quoteApi);
router.use('/spaceflight_news', spaceflightNewsApi);

export default router;
