import express from 'express';

import constants from './constants';

import applyMiddlewares from './middlewares';
import applyPlugins from './plugins';
import applyRoutes from './routes';

const {
  PORT,
  STRINGS: { SERVER_STARTED },
} = constants;

const bootstrap = async () => {
  const app = express();

  applyMiddlewares(app);
  await applyPlugins(app);
  applyRoutes(app);

  app.listen(PORT, () => console.log(SERVER_STARTED.replace('$PORT', PORT)));
};

bootstrap();
