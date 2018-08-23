import cors from 'cors';
import corsOptions from '../api/corsOptions';

export default async (app) => {
  app.use(cors(corsOptions));
};
