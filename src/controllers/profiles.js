import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { sendError, sendSuccess } from '../api/base';

const { PROFILES } = constants.COLLECTIONS;

const getProfiles = async (req, res) => {
  try {
    const profiles = await getAllDocuments(PROFILES);
    sendSuccess(res, { profiles });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getProfiles;
