import { expect } from 'chai';
import sinon from 'sinon';

import { error, success } from '../../src/api/base';
import res from '../_fixtures/res';

const sandbox = sinon.createSandbox();

describe('API: base', () => {
  beforeEach(() => {
    sandbox.stub(res, 'json');
    sandbox.stub(res, 'type');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('error template', () => {
    const errorMessage = 'A terrible error occurred.';
    const mockError = new Error(errorMessage)

    beforeEach(() => {
      error(res, mockError)
    });

    it('sets the response message to the Error string', () => {
      expect(res.json.args[0][0].message).to.equal(mockError.toString());
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
      people: ['Denis Diderot', 'Jean Jacques Rousseau', 'Voltaire']
    };

    describe('without data', () => {
      beforeEach(() => {
        success(res);
      });

      it('returns simply { status: "ok" } if no data is provided', () => {
        expect(res.json.args[0][0]).to.deep.equal({
          status: 'ok'
        });
      });
    });

    describe('with data', () => {
      beforeEach(() => {
        success(res, mockResult);
      });

      it('returns the result in the response', () => {
        expect(res.json.args[0][0].result).to.deep.equal(mockResult);
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
