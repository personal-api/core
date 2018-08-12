import * as api from './base';
import * as controller from '../controllers/repositories';

export const getRepositories = (req, res) => {
  controller
    .getRepositories()
    .then(repositories => api.success(res, { repositories }))
    .catch(err => api.error(res, err));
};
