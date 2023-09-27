import StatsDClient from 'node-statsd';

let stats = new StatsDClient({host: 'graphite', port: 8125});


export const startTracking = (req) => {
  const st = Date.now();
  req.startingTime = st;
}

export const finishTracking = (req, tags) => {
  const end = Date.now();
  const duration = end-req.startingTime;
  const path = ['project.total_time', tags.path.split('/').slice(1).join('_')].join('.');
  stats.gauge(path, duration);
  console.log(`finish tracking, finishing time is: duration, st: ${req.startingTime}, path is: ${path}`);
}

export const log = (req, metric) => {
  const end = Date.now();
  const duration = end-req.startingTime;
  stats.gauge(`project.${metric}`, duration);
}
