import {finishTracking, log} from "./tracking.js";

const errorHandler = async (err, req, res, next) => {
  const path = req.originalUrl.split('?')[0];
  finishTracking(req, {path: path});
  log(req, `error.${path.split('/')[1]}.${err.status || 500}`)
  const userMsg = {
    reason: err.message,
    endpoint: req.url,
  }
  res.status(err.status || 500).json(userMsg);
  next();
}

export default errorHandler;
