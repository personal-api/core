import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';

const mockJoinResponse = {
  repository: {
    meta: {
      name: 'ACME Repository'
    }
  }
};

const sandbox = sinon.createSandbox();
const stubGetAllDocuments = sandbox.stub();
const stubJoinRepoToProject = sandbox.stub().returns(mockJoinResponse);

const {
  getProjects,
  getProjectsWithRepos
} = proxyquire
  .noCallThru()
  .load('../../src/controllers/projects.js', {
    '../helpers/joinRepoToProject': stubJoinRepoToProject,
    '../database/services': {
      getAllDocuments: stubGetAllDocuments
    }
});

describe('project controller', () => {
  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getProjects', () => {
    const projectsArr = [projectFixture, projectFixture];
    let allDocuments;

    beforeEach(async () => {
      stubGetAllDocuments.resolves(projectsArr);
      allDocuments = await getProjects();
    });

    it('queries the projects collection', () => {
      expect(stubGetAllDocuments.args).to.deep.equal([['projects']]);
    });

    it('returns the projects', () => {
      expect(allDocuments).to.deep.equal(projectsArr);
    });
  });

  describe('getProjectsWithRepos', () => {
    const projectsArr = [projectFixture, projectFixture];
    const joinedProjectsArr = new Array(projectsArr.length).fill(mockJoinResponse);
    let allDocuments;

    beforeEach(async () => {
      stubGetAllDocuments.resolves(projectsArr);
      allDocuments = await getProjectsWithRepos();
    });

    it('queries the projects collection', () => {
      expect(stubGetAllDocuments.args).to.deep.equal([['projects']]);
    });

    it('maps each project to the project repo', () => {
      expect(stubJoinRepoToProject.args).to.deep.equal(stubJoinRepoToProject.args);
    });

    it('returns the projects with repo data attached', () => {
      expect(allDocuments).to.deep.equal(joinedProjectsArr);
    });
  });
});
