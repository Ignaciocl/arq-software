import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js'

const app = express();

app.use(routes);
app.use(errorHandler);
const server = async () => {
  app.listen(3000, () => console.log('server started on port 3000')).on('error', (e) => {
    console.log('failed to start app, with reason:', e);
    process.exit(1);
  });
}
export default server;
