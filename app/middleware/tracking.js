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
  const path = ['project.total_time', tags.path.split('/').slice(1).join('_')].join('.');
  stats.gauge(path, duration);
}

export const log = (req, metric) => {
  const end = Date.now();
  const duration = end-req.startingTime;
  stats.gauge(`project.${metric}`, duration);
}
