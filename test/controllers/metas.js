import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import metaFixture from '../_fixtures/meta';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub().resolves([metaFixture]);
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getMetas = proxyquire
  .noCallThru()
  .load('../../src/controllers/metas.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('metas controller', () => {
  const req = { query: {} };
  const res = sandbox.stub();

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getMetas', () => {
    describe('default response', () => {
      const metasArr = [metaFixture, metaFixture];

      beforeEach(async () => {
        stubGetAllDocuments.resolves(metasArr);
        await getMetas(req, res);
      });

      it('queries the metas collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['metas']]);
      });

      it('returns the metas', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          metas: metasArr,
        }]]);
      });
    });

    describe('error handling', () => {
      const mockError = new Error('something went wrong');

      beforeEach(async () => {
        stubGetAllDocuments.rejects(mockError);
        await getMetas(req, res);
      });

      it('returns the error', () => {
        expect(stubSendError.args).to.deep.equal([[res, {
          error: mockError,
        }]]);
      });
    });
  });
});
