import * as api from './base';
import * as controller from '../controllers/projects';

export const getProjects = async (req, res) => {
  try {
    const projects = await controller.getProjects();
    api.success(res, { projects });
  } catch (err) {
    api.error(res, err)
  }
};

export const getProjectsWithRepos = async (req, res) => {
  try {
    const projects = await controller.getProjectsWithRepos();
    api.success(res, { projects });
  } catch (err) {
    api.error(res, err)
  }
};
