import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { parseProject } from './projects';
import { sendError, sendSuccess } from '../api/base';

const {
  METAS,
  PROFILES,
  PROJECTS,
  QUOTES,
  REPOSITORIES,
} = constants.COLLECTIONS;

const getComposite = async (req, res) => {
  try {
    const metas = await getAllDocuments(METAS);
    const profiles = await getAllDocuments(PROFILES);
    const projects = await getAllDocuments(PROJECTS);
    const quotes = await getAllDocuments(QUOTES);
    const repositories = await getAllDocuments(REPOSITORIES);

    sendSuccess(res, {
      metas,
      profiles,
      projects: projects.map(parseProject),
      quotes,
      repositories,
    });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getComposite;
