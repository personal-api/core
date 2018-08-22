export default (repo) => {
  const {
    created_at: created,
    description,
    forks,
    language,
    license,
    stargazers_count: stars,
    updated_at: updated,
    watchers,
  } = repo;
  return {
    created,
    description,
    forks,
    language,
    license,
    stars,
    updated,
    watchers,
  };
};
