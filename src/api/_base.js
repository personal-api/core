export const error = (res, err) => {
  console.log(err);
  const message = err.toString() || err;
  res.type('json');
  res.status = 500;

  res.json({
    status: 'error',
    message
  });
};

export const success = (res, result) => {
  const rs = {};
  rs.status = 'ok';

  if (result !== undefined || result != null) {
    rs.result = result;
  }

  res.type('json');
  res.status = 200;
  res.json(rs);
};
