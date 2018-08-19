export const error = (res, err) => {
  const message = err.toString();

  res.type('json');
  res.status = 500;
  res.json({
    status: 'error',
    message
  });
};

export const success = (res, result) => {
  const response = {};

  response.status = 'ok';

  if (result) {
    response.result = result;
  }

  res.type('json');
  res.status = 200;
  res.json(response);
};
