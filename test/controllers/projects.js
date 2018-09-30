import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';
import repositoryFixture from '../_fixtures/repository';

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub();
const stubJoinRepoToProject = (project) => {
  const projectWithRepo = { project, ...repositoryFixture };
  return projectWithRepo;
};
const stubSendError = sandbox.stub();
const stubSendSuccess = sandbox.stub();

const { default: getProjects, parseProject } = proxyquire
  .noCallThru()
  .load('../../src/controllers/projects.js', {
    '../api/base': {
      sendError: stubSendError,
      sendSuccess: stubSendSuccess,
    },
    '../helpers/joinRepoToProject': stubJoinRepoToProject,
    '../mutators/convertTimestampToMs': a => a,
    '../database/services': {
      getAllDocuments: stubGetAllDocuments,
    },
  });

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

      it('returns the projects with repo data attached', async () => {
        expect(stubSendSuccess.args).to.deep.equal([[res, {
          projects: projectsArr.map(p => stubJoinRepoToProject(p)),
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

describe('project parser', () => {
  it('shouldn\t inject unexpected timestamps', () => {
    const parsed = parseProject(projectFixture);
    expect(parsed).to.deep.equal(projectFixture);
  });

  it('sets default values for timestamps', () => {
    const projectWithTimestamps = {
      ...projectFixture,
      created: { _seconds: 1000 },
      synced: { _seconds: 2000 },
      updated: { _seconds: 3000 },
    };
    const parsed = parseProject(projectWithTimestamps);
    expect(parsed).to.deep.equal({
      ...projectFixture,
      created: 1000,
      synced: 2000,
      updated: 3000,
    });
  });
});
