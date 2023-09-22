import run from "../middleware/run.js";
import Router from "express";
import Client from "../external/client.js";

const client = new Client();
const router = Router();

router.get('/', run(async () => {
  const response = await client.get("https://api.quotable.io/random", {}, {});
  if (!response) {
    const e = new Error('An error with quotable occured');
    e.status = 400;
    throw e;
  }
  const quote = response.content;
  const author = response.author;
  return [{quote, author}, 0];
}));

export default router;
