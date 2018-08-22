import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import repositoryFixture from '../_fixtures/repository';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub().resolves([repositoryFixture]);

const {
  getRepositories,
} = proxyquire
  .noCallThru()
  .load('../../src/controllers/repositories.js', {
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
});

describe('repositories controller', () => {
  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getRepositories', () => {
    const repositoriesArr = [repositoryFixture, repositoryFixture];
    let allDocuments;

    beforeEach(async () => {
      stubGetAllDocuments.resolves(repositoriesArr);
      allDocuments = await getRepositories();
    });

    it('queries the repositories collection', () => {
      expect(stubGetAllDocuments.args).to.deep.equal([['repositories']]);
    });

    it('returns the repositories', () => {
      expect(allDocuments).to.deep.equal(repositoriesArr);
    });
  });
});
