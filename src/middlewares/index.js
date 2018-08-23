import cors from './cors';
import logger from './logger';

export default (app) => {
  cors(app);
  logger(app);
};
