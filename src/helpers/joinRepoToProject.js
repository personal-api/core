import constants from '../constants';
import { getDocumentById } from '../database/services';
import { getRepositoryRef } from '../models/project';

const { REPOSITORIES } = constants.COLLECTIONS;

const joinRepoToProject = async (project) => {
  const ref = getRepositoryRef(project);
  const repository = ref ? await getDocumentById(ref, REPOSITORIES) : null;

  const updatedProject = {
    ...project,
    ...(repository ? {
      repository: {
        ...project.repository,
        meta: repository.data(),
      },
    } : {}),
  };

  return updatedProject;
};

export default joinRepoToProject;
