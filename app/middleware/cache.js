import Router from 'express';
import { createClient } from 'redis';

const EXPIRATION_TIME = 5

const router = Router();
const redisClient = await createClient({url: "redis://redis:6379"})
.on('error', err => console.error('Redis Client Error', err))
.connect();

export const readCache = async (req, res, next) => {
  const cachedValue = await redisClient.get(req.originalUrl)
  if (cachedValue){
    res.send(cachedValue);
  }else{
    next();
  }
}

export const writeCache = async(req, res) => {
  const actual_number = res.locals.actual_number
  await redisClient.set(req.originalUrl, actual_number, {EX: EXPIRATION_TIME});
  res.send(actual_number);
}
