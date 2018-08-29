import constants from '../constants';
import { getAllDocuments } from '../database/services';
import { sendError, sendSuccess } from '../api/base';

const { QUOTES } = constants.COLLECTIONS;

const getQuotes = async (req, res) => {
  try {
    const quotes = await getAllDocuments(QUOTES);
    sendSuccess(res, { quotes });
  } catch (error) {
    sendError(res, { error });
  }
};

export default getQuotes;
