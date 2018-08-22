import constants from '../constants';
import { getDocumentById } from '../database/services';
import { getRepositoryRef } from '../models/project';

const { REPOSITORIES } = constants.COLLECTIONS;

const joinRepoToProject = async (project) => {
  const ref = getRepositoryRef(project);
  const repository = await getDocumentById(ref, REPOSITORIES);

  const updatedProject = {
    ...project,
    repository: {
      ...project.repository,
      meta: repository.data(),
    },
  };

  return updatedProject;
};

export default joinRepoToProject;
