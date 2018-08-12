const getProject = project => project;

export const getName = project => project.name;

export const getRepositoryProviderId = project => project.repository.providerId;

export const getRepositoryRef = project => project.repository.ref;

export default getProject;
