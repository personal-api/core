import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import quoteFixture from '../_fixtures/quote';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub().resolves([quoteFixture]);
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getQuotes = proxyquire
  .noCallThru()
  .load('../../src/controllers/quotes.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('quotes controller', () => {
  const req = { query: {} };
  const res = sandbox.stub();

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getQuotes', () => {
    describe('default response', () => {
      const quotesArr = [quoteFixture, quoteFixture];

      beforeEach(async () => {
        stubGetAllDocuments.resolves(quotesArr);
        await getQuotes(req, res);
      });

      it('queries the quotes collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['quotes']]);
      });

      it('returns the quotes', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          quotes: quotesArr,
        }]]);
      });
    });

    describe('error handling', () => {
      const mockError = new Error('something went wrong');

      beforeEach(async () => {
        stubGetAllDocuments.rejects(mockError);
        await getQuotes(req, res);
      });

      it('returns the error', () => {
        expect(stubSendError.args).to.deep.equal([[res, {
          error: mockError,
        }]]);
      });
    });
  });
});
