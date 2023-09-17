import Router from 'express';
import {XMLParser} from 'fast-xml-parser';
import {decode} from 'metar-decoder';
import Client from '../external/client.js';
import run from "../middleware/run.js";

const parser = new XMLParser();

const client = new Client();
const router = Router();
router.get('/ping', (req, res) => res.send('pong'));
router.get('/metar', run(async (req) => {
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
  if (!parsed.data_source) {
    const e = new Error('invalid station used');
    e.status = 400;
    throw e;
  }
  return decode(parsed.response.data.METAR.raw_text);
}));

export default router;
