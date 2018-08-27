import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { sendError, sendSuccess } from '../api/base';

const {
  METAS,
  PROFILES,
  PROJECTS,
  REPOSITORIES,
} = constants.COLLECTIONS;

const getComposite = async (req, res) => {
  try {
    const metas = await getAllDocuments(METAS);
    const profiles = await getAllDocuments(PROFILES);
    const projects = await getAllDocuments(PROJECTS);
    const repositories = await getAllDocuments(REPOSITORIES);

    sendSuccess(res, {
      metas,
      profiles,
      projects,
      repositories,
    });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getComposite;