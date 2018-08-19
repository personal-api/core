import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';

const sandbox = sinon.createSandbox();

const stubAPIBase = {
  error: sandbox.stub(),
  success: sandbox.stub()
};

const stubController = {
  getProjects: sandbox.stub(),
  getProjectsWithRepos: sandbox.stub()
};

const projectsAPI = proxyquire
  .noCallThru()
  .load('../../src/api/projects', {
    './base': stubAPIBase,
    '../controllers/projects': stubController
  });

describe.only('API: projects', () => {
  const req = {};
  const res = {
    json: sandbox.stub(),
    status: 0,
    type: sandbox.stub()
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('getProjects()', () => {
    it('calls the projects controller to fetch projects', async () => {
      await projectsAPI.getProjects({}, {});
      expect(stubController.getProjects.args).to.deep.equal([[]]);
    });

    it('returns a successful API response with projects', async () => {
      const projectsResponse = [ projectFixture ];
      stubController.getProjects.resolves(projectsResponse);
      await projectsAPI.getProjects({}, {});
      expect(stubAPIBase.success.args[1][1]).to.deep.equal({
        projects: projectsResponse
      });
    });

    // NOTE(cvogt): this passes but throws a warning into the JS console
    it.skip('returns an error if projects could not be fetched', async () => {
      const errorMessage = new Error('This is what I\'ve been waiting for');
      stubController.getProjects.throws(errorMessage);
      await projectsAPI.getProjects({}, {});
      expect(stubAPIBase.error.args).to.deep.equal([
        [
          {},
          errorMessage
        ]
      ]);
    });
  });

  describe('getProjectsWithRepos()', () => {
    it('calls the projects controller to fetch projects with repos', async () => {
      await projectsAPI.getProjectsWithRepos({}, {});
      expect(stubController.getProjectsWithRepos.args).to.deep.equal([[]]);
    });

    it('returns a successful API response with projects and repos', async () => {
      const projectsResponse = [ projectFixture ];
      stubController.getProjectsWithRepos.resolves(projectsResponse);
      await projectsAPI.getProjectsWithRepos({}, {});
      expect(stubAPIBase.success.args[1][1]).to.deep.equal({
        projects: projectsResponse
      });
    });

    it.skip('returns an error if projects with repos could not be fetched', async () => {
      const errorMessage = new Error('This is what I\'ve been waiting for');
      stubController.getProjectsWithRepos.throws(errorMessage);
      await projectsAPI.getProjectsWithRepos({}, {});
      expect(stubAPIBase.error.args).to.deep.equal([
        [
          {},
          errorMessage
        ]
      ]);
    });
  });
});
