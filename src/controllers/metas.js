import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { sendError, sendSuccess } from '../api/base';

const { METAS } = constants.COLLECTIONS;

const getMetas = async (req, res) => {
  try {
    const metas = await getAllDocuments(METAS);
    sendSuccess(res, { metas });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getMetas;
