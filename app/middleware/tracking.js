import StatsDClient from 'node-statsd';

let stats = new StatsDClient({host: 'graphite', port: 8125});


export const startTracking = (req) => {
  const st = Date.now();
  req.startingTime = st;
}

export const finishTracking = (req, tags, startingTime) => {
  const end = Date.now();
  let st = startingTime;
  if (!st) {
    st = req.startingTime;
  }
  const duration = end - st;
  const path = ['project.total_time', tags.path.split('/').slice(1).filter((v) => !!v).join('_')].join('.');
  if (duration < 40000) {
    stats.gauge(path, duration);
  }
}

export const log = (req, metric, st) => {
  const end = Date.now();
  let startingTime = st
  if (!startingTime) {
    startingTime = req.startingTime;
  }
  const duration = end - startingTime;
  if (duration < 40000) {
    stats.gauge(`project.${metric}`, duration);
  }
}
