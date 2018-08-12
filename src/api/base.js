export const error = (res, err) => {
  const message = err.toString();

  res.json({
    status: 'error',
    message
  });
  res.status = 500;
  res.type('json');
};

export const success = (res, result) => {
  const response = {};

  response.status = 'ok';

  if (result) {
    response.result = result;
  }

  res.json(response);
  res.status = 200;
  res.type('json');
};
