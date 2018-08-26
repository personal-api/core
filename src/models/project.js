const getProject = project => project;

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
