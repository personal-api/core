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

const stubExpressFuncs = {
  get: stubGet,
  listen: stubListen,
  use: stubUse,
};

const stubExpress = () => stubExpressFuncs;

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
    expect(index).to.be.ok;
    expect(true).to.deep.equal(true);
  });
});
