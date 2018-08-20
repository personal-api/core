import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import projectFixture from '../_fixtures/project';
import res from '../_fixtures/res';

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

describe('API: projects', () => {
  const req = {};

  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getProjects()', () => {
    it('calls the projects controller to fetch projects', async () => {
      await projectsAPI.getProjects(req, res);
      expect(stubController.getProjects.args).to.deep.equal([[]]);
    });

    it('returns a successful API response with projects', async () => {
      const projectsResponse = [ projectFixture ];
      stubController.getProjects.resolves(projectsResponse);
      await projectsAPI.getProjects(req, res);
      expect(stubAPIBase.success.args).to.deep.equal([
        [
          res,
          { projects: projectsResponse }
        ]
      ]);
    });

    it('returns an error if projects could not be fetched', async () => {
      const errorMessage = new Error('This is what I\'ve been waiting for');
      stubController.getProjects.throws(errorMessage);
      await projectsAPI.getProjects(req, res);
      expect(stubAPIBase.error.args).to.deep.equal([
        [
          res,
          errorMessage
        ]
      ]);
    });
  });

  describe('getProjectsWithRepos()', () => {
    it('calls the projects controller to fetch projects with repos', async () => {
      await projectsAPI.getProjectsWithRepos(req, res);
      expect(stubController.getProjectsWithRepos.args).to.deep.equal([[]]);
    });

    it('returns a successful API response with projects and repos', async () => {
      const projectsResponse = [ projectFixture ];
      stubController.getProjectsWithRepos.resolves(projectsResponse);
      await projectsAPI.getProjectsWithRepos(req, res);
      expect(stubAPIBase.success.args).to.deep.equal([
        [
          res,
          {
            projects: projectsResponse
          }
        ]
      ]);
    });

    it('returns an error if projects with repos could not be fetched', async () => {
      const errorMessage = new Error('This is what I\'ve been waiting for');
      stubController.getProjectsWithRepos.throws(errorMessage);
      await projectsAPI.getProjectsWithRepos(req, res);
      expect(stubAPIBase.error.args).to.deep.equal([
        [
          res,
          errorMessage
        ]
      ]);
    });
  });
});
