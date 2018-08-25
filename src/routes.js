import apicache from 'apicache';

import constants from './constants';
import { getProjects, getProjectsWithRepos } from './api/projects';
import { getRepositories } from './api/repositories';

const isProduction = process.env.NODE_ENV === 'production';
const cacheOptions = {
  debug: process.env.DEBUG_APP,
  enabled: isProduction,
};
const cache = apicache.options(cacheOptions).middleware;
const { DEFAULT_CACHE_TIME } = constants;

export default (app) => {
  app.get('/projects', cache(DEFAULT_CACHE_TIME), getProjects);
  app.get('/projectsWithRepos', cache(DEFAULT_CACHE_TIME), getProjectsWithRepos);
  app.get('/repositories', cache(DEFAULT_CACHE_TIME), getRepositories);
};
