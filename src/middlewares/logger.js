import morgan from 'morgan';

export default async (app) => {
  const formatString = process.env.NODE_ENV !== 'production' ? 'dev' : 'tiny';
  const logger = morgan(formatString);

  app.use(logger);
};
