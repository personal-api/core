import octokit from '@octokit/rest';

export default async (id) => {
  const {
    getNextPage,
    hasNextPage,
    repos: { getById }
  } = new octokit();

  try {
    const { data = {} } = await getById({ id });
    return data;
  } catch (error) {
    console.log('An error occured fetching the data.');
    console.warn(error);
  }
};
