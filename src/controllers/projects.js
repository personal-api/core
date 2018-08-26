import constants from '../constants';
import { getAllDocuments } from '../database/services';
import joinRepoToProject from '../helpers/joinRepoToProject';
import { sendError, sendSuccess } from '../api/base';

const { PROJECTS } = constants.COLLECTIONS;

const getProjectsAndRepos = async () => {
  const projects = await getAllDocuments(PROJECTS);
  const projectsAndRepos = projects.map(joinRepoToProject);
  return Promise.all(projectsAndRepos);
};

const getProjects = async (req, res) => {
  const {
    query: {
      repository: repositoryParam,
    } = {},
  } = req;

  const includeRepository = repositoryParam === 'expanded';
  try {
    const projects = includeRepository
      ? await getProjectsAndRepos()
      : await getAllDocuments(PROJECTS);

    sendSuccess(res, { projects });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getProjects;
