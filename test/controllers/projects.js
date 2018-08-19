import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';

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
