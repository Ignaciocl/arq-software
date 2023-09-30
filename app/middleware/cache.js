import { createClient } from 'redis';
import Client from "../external/client.js";
import {finishTracking, log, startTracking} from "./tracking.js";

const redisClient = await createClient({url: "redis://redis:6379"})
.on('error', err => console.error('Redis Client Error', err))
.connect();

redisClient.configSet('notify-keyspace-events', 'Ex');
const sub = redisClient.duplicate();
sub.connect();
const client = new Client();
sub.subscribe('__keyevent@0__:expired', async (key) => {
  if (key.includes('spaceflight')) {
    console.log(`refreshing for key`, key);
    await client.get(`http://localhost:3000${key}`, {}, undefined);
  }
});

export const readCache = async (req, res, next) => {
  startTracking(req);
  const cachedValue = await redisClient.get(req.originalUrl)
  if (cachedValue){
    res.send(JSON.parse(cachedValue));
    const path = req.originalUrl.split('?')[0];
    finishTracking(req, {path: path});
    log(req, `success.${path.split('/')[1]}.200`)
  }else{
    next();
  }
}

export const writeCache = async (key, value, exTime) => {
  await redisClient.set(key, value, { EX: exTime });
}
