import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import repositoryFixture from '../_fixtures/repository';
import res from '../_fixtures/res';

const sandbox = sinon.createSandbox();

const stubAPIBase = {
  error: sandbox.stub(),
  success: sandbox.stub()
};

const stubController = {
  getRepositories: sandbox.stub()
};

const repositoriesAPI = proxyquire
  .noCallThru()
  .load('../../src/api/repositories', {
    './base': stubAPIBase,
    '../controllers/repositories': stubController
  });

describe('API: repositories', () => {
  const req = {};

  afterEach(() => {
    sandbox.resetHistory();
  });

  it('calls the repositories controller to fetch repositories', async () => {
    await repositoriesAPI.getRepositories(req, res);
    expect(stubController.getRepositories.args).to.deep.equal([[]]);
  });

  describe('getRepositories()', () => {
    it('calls the repositories controller to fetch repositories', async () => {
      await repositoriesAPI.getRepositories(req, res);
      expect(stubController.getRepositories.args).to.deep.equal([[]]);
    });

    it('returns a successful API response with repositories', async () => {
      const repositoriesResponse = [ repositoryFixture ];
      stubController.getRepositories.resolves(repositoriesResponse);
      await repositoriesAPI.getRepositories(req, res);
      expect(stubAPIBase.success.args).to.deep.equal([
        [
          res,
          { repositories: repositoriesResponse }
        ]
      ]);
    });
  });
});
