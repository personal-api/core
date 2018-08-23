import cors from 'cors';
import corsOptions from '../api/corsOptions';

export default (app) => {
  app.use(cors(corsOptions));
};
