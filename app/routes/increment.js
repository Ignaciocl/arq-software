import Router from 'express';
import run from "../middleware/run.js";

const router = Router();
let i = 0

router.get('/', run(async (req) => {
  i += 1;
  return String(i);
}));

export default router;
