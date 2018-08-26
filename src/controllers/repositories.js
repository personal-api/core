import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { sendError, sendSuccess } from '../api/base';

const { REPOSITORIES } = constants.COLLECTIONS;

const getRepositories = async (req, res) => {
  try {
    const repositories = await getAllDocuments(REPOSITORIES);
    sendSuccess(res, { repositories });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getRepositories;
