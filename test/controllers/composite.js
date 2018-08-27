import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import constants from '../../src/constants';

const {
  METAS,
  PROFILES,
  PROJECTS,
  REPOSITORIES,
} = constants.COLLECTIONS;

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub();
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getComposite = proxyquire
  .noCallThru()
  .load('../../src/controllers/composite.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('composite controller', () => {
  const req = { query: {} };
  const res = sandbox.stub();

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getComposite()', () => {
    before(() => {
      stubGetAllDocuments.withArgs(METAS).resolves(METAS);
      stubGetAllDocuments.withArgs(PROFILES).resolves(PROFILES);
      stubGetAllDocuments.withArgs(PROJECTS).resolves(PROJECTS);
      stubGetAllDocuments.withArgs(REPOSITORIES).resolves(REPOSITORIES);
    });

    it('calls getAllDocuments() for each entity', async () => {
      await getComposite(req, res);
      expect(stubGetAllDocuments.args).to.deep.equal([
        [METAS],
        [PROFILES],
        [PROJECTS],
        [REPOSITORIES],
      ]);
    });

    it('returns the expected set of data', async () => {
      await getComposite(req, res);
      expect(stubSendSuccess.args).to.deep.equal([[res, {
        [METAS]: METAS,
        [PROFILES]: PROFILES,
        [PROJECTS]: PROJECTS,
        [REPOSITORIES]: REPOSITORIES,
      }]]);
    });
  });

  describe('error handling', () => {
    const mockError = new Error('something went wrong');

    before(() => {
      stubGetAllDocuments.withArgs(METAS).rejects(mockError);
    });

    beforeEach(async () => {
      await getComposite(req, res);
    });

    it('returns the error', () => {
      expect(stubSendError.args).to.deep.equal([[res, {
        error: mockError,
      }]]);
    });
  });
});
