import InstagramPlugin from '@personal-api/plugin-instagram';
import handlers from '../api/handlers';

export default (app) => {
  const Instagram = new InstagramPlugin({
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    userId: process.env.INSTAGRAM_USER_ID,
  });

  Instagram.apply(app, handlers);
};
