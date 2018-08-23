import { getProjects, getProjectsWithRepos } from './api/projects';
import { getRepositories } from './api/repositories';

export default (app) => {
  app.get('/projects', getProjects);
  app.get('/projectsWithRepos', getProjectsWithRepos);
  app.get('/repositories', getRepositories);
};
