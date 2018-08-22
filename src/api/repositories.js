import * as api from './base';
import * as controller from '../controllers/repositories';

export const getRepositories = async (req, res) => {
  try {
    const repositories = await controller.getRepositories();
    api.success(res, { repositories });
  } catch (err) {
    api.error(res, err);
  }
};

export default {
  getRepositories,
};
