import express from 'express';

import constants from './constants';

import applyMiddlewares from './middlewares';
import applyRoutes from './routes';

const {
  PORT,
  STRINGS: { SERVER_STARTED },
} = constants;

const bootstrap = async () => {
  const app = express();

  applyMiddlewares(app);
  applyRoutes(app);

  app.listen(PORT, () => console.log(SERVER_STARTED.replace('$PORT', PORT)));
};

bootstrap();
