import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';

const mockJoinResponse = {
  repository: {
    meta: {
      name: 'ACME Repository',
    },
  },
};

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub();
const stubJoinRepoToProject = sandbox.stub().returns(mockJoinResponse);
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const getProjects = proxyquire
  .noCallThru()
  .load('../../src/controllers/projects.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../helpers/joinRepoToProject': stubJoinRepoToProject,
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  }).default;

describe('project controller', () => {
  let req = {};
  const res = sandbox.stub();

  afterEach(() => {
    req = {};
    sandbox.resetHistory();
  });

  describe('getProjects', () => {
    describe('default response', () => {
      const projectsArr = [projectFixture, projectFixture];

      beforeEach(async () => {
        stubGetAllDocuments.resolves(projectsArr);
        await getProjects(req, res);
      });

      it('queries the projects collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['projects']]);
      });

      it('returns the projects', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          projects: projectsArr,
        }]]);
      });
    });

    describe('with repository data expanded', () => {
      const projectsArr = [projectFixture, projectFixture];
      const joinedProjectsArr = new Array(projectsArr.length).fill(mockJoinResponse);

      beforeEach(async () => {
        req = {
          query: {
            repository: 'expanded',
          },
        };
        stubGetAllDocuments.resolves(projectsArr);
        await getProjects(req, res);
      });

      it('queries the projects collection', () => {
        expect(stubGetAllDocuments.args).to.deep.equal([['projects']]);
      });

      it('maps each project to the project repo', () => {
        expect(stubJoinRepoToProject.args).to.deep.equal(stubJoinRepoToProject.args);
      });

      it('returns the projects with repo data attached', () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          projects: joinedProjectsArr,
        }]]);
      });
    });
  });

  describe('error handling', () => {
    const mockError = new Error('something went wrong');

    beforeEach(async () => {
      stubGetAllDocuments.rejects(mockError);
      await getProjects(req, res);
    });

    it('returns the error', () => {
      expect(stubSendError.args).to.deep.equal([[res, {
        error: mockError,
      }]]);
    });
  });
});
