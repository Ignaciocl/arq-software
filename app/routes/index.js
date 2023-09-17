import Router from 'express';
import metarApi from './metar.js'
const router = Router();
router.get('/ping', (req, res) => res.send('pong'));
router.use('/metar', metarApi)

export default router;
