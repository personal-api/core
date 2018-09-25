import constants from '../constants';
import convertTimestampToMs from '../mutators/convertTimestampToMs';
import { getCreated, getSynced, getUpdated } from '../models/project';
import { getAllDocuments } from '../database/services';
import joinRepoToProject from '../helpers/joinRepoToProject';
import { sendError, sendSuccess } from '../api/base';

const { PROJECTS } = constants.COLLECTIONS;

const getProjectsAndRepos = async () => {
  const projects = await getAllDocuments(PROJECTS);
  const projectsAndRepos = projects.map(joinRepoToProject);
  return Promise.all(projectsAndRepos);
};

export const parseProject = (project) => {
  const created = getCreated(project);
  const synced = getSynced(project);
  const updated = getUpdated(project);

  const parsed = {
    ...project,
    ...(created ? { created: convertTimestampToMs(created) } : {}),
    ...(synced ? { synced: convertTimestampToMs(synced) } : {}),
    ...(updated ? { updated: convertTimestampToMs(updated) } : {}),
  };

  return parsed;
};

const getProjects = async (req, res) => {
  const {
    query: {
      repository: repositoryParam,
    } = {},
  } = req;

  const includeRepository = repositoryParam === 'expanded';
  try {
    const projectsCollection = includeRepository
      ? await getProjectsAndRepos()
      : await getAllDocuments(PROJECTS);

    const projects = projectsCollection.map(parseProject);

    sendSuccess(res, { projects });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getProjects;
