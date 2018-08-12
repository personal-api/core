import cors from 'cors';
import express from 'express';

import constants from './constants';
import corsOptions from './api/_corsOptions';
import { getProjects, getProjectsWithRepos } from './api/projects';
import { getRepositories } from './api/repositories';

const {
  PORT,
  STRINGS: { SERVER_STARTED }
} = constants;

const app = express();

app.use(cors(corsOptions));

app.get('/projects', getProjects);
app.get('/projectsWithRepos', getProjectsWithRepos);
app.get('/repositories', getRepositories);

app.listen(PORT, () => console.log(SERVER_STARTED.replace('$PORT', PORT)))
