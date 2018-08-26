import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import repositoryFixture from '../_fixtures/repository';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub().resolves([repositoryFixture]);
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getRepositories = proxyquire
  .noCallThru()
  .load('../../src/controllers/repositories.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('repositories controller', () => {
  const req = { query: {} };
  const res = sandbox.stub();

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getRepositories', () => {
    describe('default response', () => {
      const repositoriesArr = [repositoryFixture, repositoryFixture];

      beforeEach(async () => {
        stubGetAllDocuments.resolves(repositoriesArr);
        await getRepositories(req, res);
      });

      it('queries the repositories collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['repositories']]);
      });

      it('returns the repositories', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          repositories: repositoriesArr,
        }]]);
      });
    });

    describe('error handling', () => {
      const mockError = new Error('something went wrong');

      beforeEach(async () => {
        stubGetAllDocuments.rejects(mockError);
        await getRepositories(req, res);
      });

      it('returns the error', () => {
        expect(stubSendError.args).to.deep.equal([[res, {
          error: mockError,
        }]]);
      });
    });
  });
});
