import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(routes);

const server = async () => {
  app.listen(4000, () => console.log('server started')).on('error', (e) => {
    console.log('failed to start app, with reason:', e);
    process.exit(1);
  });
}
export default server;
