import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const stubGetProjects = sinon.stub();
const stubGetProjectsWithRepos = sinon.stub();

const stubGet = sinon.stub();
const stubListen = sinon.stub();
const stubUse = sinon.stub();

const stubCors = sinon.stub();
const stubCorsOptions = { option1: 'value1', option2: 'value2' };

const stubExpress = () => {
  return {
    get: stubGet,
    listen: stubListen,
    use: stubUse,
  };
};

const index = proxyquire('../src/server.js', {
  cors: stubCors,
  './api/corsOptions': stubCorsOptions,
  './api/projects': {
    stubGetProjects,
    stubGetProjectsWithRepos,
  },
  express: stubExpress,
});

describe('server.js', () => {
  it('it returns the server', () => {
    expect(true).to.deep.equal(true);
  });
});
