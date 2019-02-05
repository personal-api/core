import cache from './utils/getCache';
import constants from './constants';
import getComposite from './controllers/composite';
import getMetas from './controllers/metas';
import getProfiles from './controllers/profiles';
import getProjects from './controllers/projects';
import getQuotes from './controllers/quotes';
import getRepositories from './controllers/repositories';

const { DEFAULT_CACHE_TIME } = constants;

export default (app) => {
  app.use(cache(DEFAULT_CACHE_TIME));
  app.use('/composite', getComposite);
  app.use('/metas', getMetas);
  app.use('/profiles', getProfiles);
  app.use('/projects', getProjects);
  app.use('/quotes', getQuotes);
  app.use('/repositories', getRepositories);
};
