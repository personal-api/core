import * as api from './base';
import * as controller from '../controllers/projects';

export const getProjects = (req, res) => {
  controller
    .getProjects()
    .then(projects => api.success(res, { projects }))
    .catch(err => api.error(res, err));
};

export const getProjectsWithRepos = (req, res) => {
  controller
    .getProjectsWithRepos()
    .then(projects => api.success(res, { projects }))
    .catch(err => api.error(res, err));
};
