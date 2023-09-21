import { createClient } from 'redis';

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

export const writeCache = async(key, value, ex_time) => {
  await redisClient.set(key, value, {EX: ex_time});
}
