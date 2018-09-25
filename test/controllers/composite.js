import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import constants from '../../src/constants';

const {
  METAS,
  PROFILES,
  PROJECTS,
  QUOTES,
  REPOSITORIES,
} = constants.COLLECTIONS;

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub();
const stubParseProject = project => project;
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getComposite = proxyquire
  .noCallThru()
  .load('../../src/controllers/composite.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    './projects': {
      parseProject: stubParseProject,
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
    const mockProjects = [{ id: '1' }, { id: '2' }];

    before(() => {
      stubGetAllDocuments.withArgs(METAS).resolves(METAS);
      stubGetAllDocuments.withArgs(PROFILES).resolves(PROFILES);
      stubGetAllDocuments.withArgs(PROJECTS).resolves(mockProjects);
      stubGetAllDocuments.withArgs(QUOTES).resolves(QUOTES);
      stubGetAllDocuments.withArgs(REPOSITORIES).resolves(REPOSITORIES);
    });

    it('calls getAllDocuments() for each entity', async () => {
      await getComposite(req, res);
      expect(stubGetAllDocuments.args).to.deep.equal([
        [METAS],
        [PROFILES],
        [PROJECTS],
        [QUOTES],
        [REPOSITORIES],
      ]);
    });

    it('returns the expected set of data', async () => {
      await getComposite(req, res);
      expect(stubSendSuccess.args).to.deep.equal([[res, {
        [METAS]: METAS,
        [PROFILES]: PROFILES,
        [PROJECTS]: mockProjects,
        [QUOTES]: QUOTES,
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
