import Router from 'express';

const router = Router();
router.get('/ping', (res, req) => req.send('pong'));

export default router;
