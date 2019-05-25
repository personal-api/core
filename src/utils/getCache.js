import apicache from 'apicache';

const options = {
  debug: process.env.DEBUG_APP,
  enabled: process.env.ENABLE_CACHE,
};

const cache = apicache.options(options).middleware;

export default cache;
