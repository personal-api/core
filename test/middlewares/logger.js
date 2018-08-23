import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const DEV = 'dev';
const PROD = 'production';
const TEST = 'test';
const MORGAN = 'morgan';

const sandbox = sinon.createSandbox();
const stubExpress = { use: sandbox.stub() };
const stubMorgan = sandbox.stub();
const stubProcess = {
  env: {
    NODE_ENV: TEST,
  },
};

const logger = proxyquire
  .noCallThru()
  .load('../../src/middlewares/logger.js', {
    process: stubProcess,
    morgan: stubMorgan,
  }).default;

describe('middleware: logger', () => {
  afterEach(() => {
    stubProcess.env.NODE_ENV = TEST;
    sandbox.resetHistory();
  });

  it('loads the logger middleware', () => {
    stubMorgan.returns(MORGAN);
    logger(stubExpress);
    expect(stubExpress.use.args).to.deep.equal([[MORGAN]]);
  });

  it('uses the expected production logger config', () => {
    process.env.NODE_ENV = PROD;
    logger(stubExpress);
    expect(stubMorgan.args).to.deep.equal([['tiny']]);
  });

  it('uses the expected non-production logger config', () => {
    process.env.NODE_ENV = DEV;
    logger(stubExpress);
    expect(stubMorgan.args).to.deep.equal([['dev']]);
  });
});
