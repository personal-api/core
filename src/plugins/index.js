import InstagramPlugin from '@personal-api/plugin-instagram';
/**
 * Import your plugins here.
 */

export default (app) => {
  const Instagram = new InstagramPlugin({
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    userId: process.env.INSTAGRAM_USER_ID,
    count: 2,
  });
  Instagram.apply(app);
};
