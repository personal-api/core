import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import profileFixture from '../_fixtures/profile';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub().resolves([profileFixture]);
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getProfiles = proxyquire
  .noCallThru()
  .load('../../src/controllers/profiles.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('profiles controller', () => {
  const req = { query: {} };
  const res = sandbox.stub();

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getProfiles', () => {
    describe('default response', () => {
      const profilesArr = [profileFixture, profileFixture];

      beforeEach(async () => {
        stubGetAllDocuments.resolves(profilesArr);
        await getProfiles(req, res);
      });

      it('queries the profiles collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['profiles']]);
      });

      it('returns the profiles', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          profiles: profilesArr,
        }]]);
      });
    });

    describe('error handling', () => {
      const mockError = new Error('something went wrong');

      beforeEach(async () => {
        stubGetAllDocuments.rejects(mockError);
        await getProfiles(req, res);
      });

      it('returns the error', () => {
        expect(stubSendError.args).to.deep.equal([[res, {
          error: mockError,
        }]]);
      });
    });
  });
});
