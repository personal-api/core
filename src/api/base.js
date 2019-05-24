export const sendError = (res, error) => {
  res.type('json');
  res.status = 500;
  res.json({
    status: 'error',
    error,
  });
};

export const sendSuccess = (res, result) => {
  res.type('json');
  res.status = 200;
  res.json({
    status: 'ok',
    result,
  });
};
