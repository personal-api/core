import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const repositoryFixture = {
  name: 'Fake repository'
};

const sandbox = sinon.createSandbox();

const stubAPIBase = {
  error: sandbox.stub(),
  success: sandbox.stub()
};

const stubController = {
  getRepositories: sandbox.stub()
};

const projectsAPI = proxyquire
  .noCallThru()
  .load('../../src/api/projects', {
    './base': stubAPIBase,
    '../controllers/projects': stubController
  });

describe('API: repositories', () => {

});