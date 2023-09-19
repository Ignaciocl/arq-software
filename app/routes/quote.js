import run from "../middleware/run.js";
import Router from "express";
import Client from "../external/client.js";
import {XMLParser} from "fast-xml-parser";

const client = new Client();
const router = Router();
const parser = new XMLParser();

router.get('/', run(async () => {
  const response = await client.get("https://api.quotable.io/random", {}, {});
  console.log("response", response);
  if (!response) {
    const e = new Error('An error with quotable occured');
    e.status = 400;
    throw e;
  }
  const quote = response.content;
  const author = response.author;
  return {quote, author};
}));

export default router;
