import { expect } from 'chai';
import sinon from 'sinon';

import { sendError, sendSuccess } from '../../src/api/base';
import res from '../_fixtures/res';

describe.only('API: base', () => {
  beforeEach(() => {
    sinon.stub(res, 'json');
    sinon.stub(res, 'type');
  });

  afterEach(() => {
    sinon.restore();
    res.status = 0;
  });

  describe('error template', () => {
    const errorMessage = 'A terrible error occurred.';
    const mockError = new Error(errorMessage);

    beforeEach(() => {
      sendError(res, { error: mockError });
    });

    it('sets the response message to the Error string', () => {
      expect(res.json.args).to.deep.equal([[{
        error: {
          error: mockError,
        },
        status: 'error',
      }]]);
    });

    it('sets the response status code to 500', () => {
      expect(res.status).to.equal(500);
    });

    it('sets the response type to json', () => {
      expect(res.type.args).to.deep.equal([['json']]);
    });
  });

  describe('success template', () => {
    const mockResult = {
      people: ['Denis Diderot', 'Jean Jacques Rousseau', 'Voltaire'],
    };

    describe('without data', () => {
      beforeEach(() => {
        sendSuccess(res);
      });

      it('returns simply { status: "ok" } if no data is provided', () => {
        expect(res.json.args).to.deep.equal([[{
          status: 'ok',
        }]]);
      });
    });

    describe('with data', () => {
      beforeEach(() => {
        sendSuccess(res, mockResult);
      });

      it('returns the result in the response', () => {
        expect(res.json.args).to.deep.equal([[{
          result: mockResult,
          status: 'ok',
        }]]);
      });

      it('sets the status code to 200', () => {
        expect(res.status).to.equal(200);
      });

      it('sets the response type to json', () => {
        expect(res.type.args).to.deep.equal([['json']]);
      });
    });
  });
});
