import cors from './cors';
import logger from './logger';

export default async (app) => {
  cors(app);
  logger(app);
};
