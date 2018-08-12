import constants from '../constants';
import { getAllDocuments } from '../database/services';

const { REPOSITORIES } = constants.COLLECTIONS;

export const getRepositories = async () => {
  return await getAllDocuments(REPOSITORIES);
}
