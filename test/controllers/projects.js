import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const projectFixture = {
  name: 'js-personal-api',
  repository: {
    provider: 'github',
    providerId: 144503664,
    ref: '1RTQoq4uqT2e8dzoBcGc'
  }
};

const stubGetAllDocuments = sinon.stub();

const {
  getProjects,
  getProjectsWithRepos
} = proxyquire
  .noCallThru()
  .load('../../src/controllers/projects.js', {
    '../database/services': {
      getAllDocuments: stubGetAllDocuments
    }
});

describe('project controller', () => {
  describe('getProjects', () => {
    const projectsArr = [projectFixture, projectFixture];
    let allDocuments

    beforeEach(async () => {
      stubGetAllDocuments.resolves(projectsArr);
      allDocuments = await getProjects();
    });

    it('queries the projects collection', () => {
      expect(stubGetAllDocuments.args).to.deep.equal([['projects']]);
    });

    it('returns the projects', () => {
      expect(allDocuments).to.deep.equal(projectsArr);
    })
  })
});
