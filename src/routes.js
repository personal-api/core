import apicache from 'apicache';

import { getProjects, getProjectsWithRepos } from './api/projects';
import { getRepositories } from './api/repositories';

const cacheOptions = { debug: true };
const cache = apicache.options(cacheOptions).middleware;

export default (app) => {
  app.get('/projects', cache('3 hours'), getProjects);
  app.get('/projectsWithRepos', cache('3 hours'), getProjectsWithRepos);
  app.get('/repositories', cache('3 hours'), getRepositories);
};
