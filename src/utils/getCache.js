import apicache from 'apicache';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  debug: process.env.DEBUG_APP,
  enabled: isProduction,
};

const cache = apicache.options(options).middleware;

export default cache;
