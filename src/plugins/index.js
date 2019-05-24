import InstagramPlugin from '@personal-api/plugin-instagram';
import apicache from '../utils/getCache';
import constants from '../constants';
import { sendError, sendSuccess } from '../api/base';

const { DEFAULT_CACHE_TIME } = constants;

/**
 * Import your plugins here.
 */

export default (app) => {
  const middleware = apicache(DEFAULT_CACHE_TIME);
  const Instagram = new InstagramPlugin({
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    userId: process.env.INSTAGRAM_USER_ID,
    middleware,
    onError: sendError,
    onSuccess: sendSuccess,
    count: 1,
  });
  Instagram.apply(app);
};
