import octokit from '@octokit/rest';

import { PROVIDER_MAX_PER_PAGE } from './constants';

export default async (username) => {
  const {
    getNextPage,
    hasNextPage,
    repos: { getForUser }
  } = new octokit();

  try {
    let response = await getForUser({
      username: username,
      per_page: PROVIDER_MAX_PER_PAGE
    });
    let { data } = response;

    while (hasNextPage(response)) {
      response = await getNextPage(response);
      data = data.concat(response.data);
    }

    return data;
  } catch (error) {
    console.log('An error occured fetching the data.');
    console.warn(error);
  }
};
