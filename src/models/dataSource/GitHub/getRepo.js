import Octokit from '@octokit/rest';

export default async (id) => {
  const {
    repos: { getById },
  } = new Octokit();

  try {
    const { data = {} } = await getById({ id });
    return data;
  } catch (error) {
    console.log('An error occured fetching the data.');
    console.warn(error);
    return {};
  }
};
