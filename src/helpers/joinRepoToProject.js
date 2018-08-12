import constants from '../constants';
import { getDocumentById } from '../database/services';

const { REPOSITORIES } = constants.COLLECTIONS;

import { getRepositoryRef } from '../models/project';

const joinRepoToProject = async project => {
  const ref = getRepositoryRef(project);
  const repository = await getDocumentById(ref, REPOSITORIES);

  project.repository.meta = repository.data();

  return project;
};

export default joinRepoToProject;
