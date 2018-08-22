import constants from '../constants';
import { getAllDocuments } from '../database/services';

const { REPOSITORIES } = constants.COLLECTIONS;

export const getRepositories = async () => {
  const repositories = await getAllDocuments(REPOSITORIES);
  return repositories;
};

export default {
  getAllDocuments,
};
