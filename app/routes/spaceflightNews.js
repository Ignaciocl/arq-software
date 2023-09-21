import run from "../middleware/run.js";
import Router from "express";
import Client from "../external/client.js";

const client = new Client();
const router = Router();

router.get('/', run(async () => {
  const query = {
    "_limit": 5
  }
  const response = await client.get("https://api.spaceflightnewsapi.net/v3/articles", {}, query);
  const titles = response.map(article => article.title);

  return titles;
}));

export default router;