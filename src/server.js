import express from 'express';

import constants from './constants';
import { getProjects, getProjectsWithRepos } from './api/projects';
import { getRepositories } from './api/repositories';
import middlewares from './middlewares';

const {
  PORT,
  STRINGS: { SERVER_STARTED },
} = constants;

const bootstrap = async () => {
  const app = express();

  await middlewares(app);

  app.get('/projects', getProjects);
  app.get('/projectsWithRepos', getProjectsWithRepos);
  app.get('/repositories', getRepositories);

  app.listen(PORT, () => console.log(SERVER_STARTED.replace('$PORT', PORT)));
};

try {
  bootstrap();
} catch (error) {
  console.error(error);
}
