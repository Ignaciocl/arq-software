import Router from 'express';

const router = Router();
let i = 0

router.get('/', async (req, res, next) => {
  i += 1;
  res.locals.actual_number = String(i)
  next()
});

export default router;
