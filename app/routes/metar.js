import run from "../middleware/run.js";
import {decode} from "metar-decoder";
import Router from "express";
import {XMLParser} from "fast-xml-parser";
import Client from "../external/client.js";

const parser = new XMLParser();
const client = new Client();
const router = Router();

router.get('/', run(async (req) => {
  const { station } = req.query;
  const query = {
    datasource: 'metars',
    requestType: 'retrieve',
    format: 'xml',
    stationString: station,
    hoursBeforeNow: 1,
  }
  const data = await client.get('https://www.aviationweather.gov/adds/dataserver_current/httpparam', {}, query)
  const parsed = parser.parse(data);
  if (!parsed.response.data) {
    const e = new Error('invalid station used');
    e.status = 400;
    throw e;
  }
  return [decode(parsed.response.data.METAR.raw_text), 3600];
}));

export default router;
