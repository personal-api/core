import get from 'lodash/get';

const getProject = project => project;

export const getCreated = project => get(project, 'created._seconds');
export const getSynced = project => get(project, 'synced._seconds');
export const getUpdated = project => get(project, 'updated._seconds');

export const getName = project => project.name;

export const getRepositoryProviderId = project => project.repository.providerId;

export const getRepositoryRef = (project) => {
  const {
    repository: {
      ref,
    } = {},
  } = project;

  return ref;
};

export default getProject;
