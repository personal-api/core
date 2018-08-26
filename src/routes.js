import apicache from 'apicache';

import constants from './constants';
import getProjects from './controllers/projects';
import getRepositories from './controllers/repositories';

const isProduction = process.env.NODE_ENV === 'production';
const cacheOptions = {
  debug: process.env.DEBUG_APP,
  enabled: isProduction,
};
const cache = apicache.options(cacheOptions).middleware;
const { DEFAULT_CACHE_TIME } = constants;

export default (app) => {
  app.use('/projects', cache(DEFAULT_CACHE_TIME), getProjects);
  app.use('/repositories', cache(DEFAULT_CACHE_TIME), getRepositories);
};
