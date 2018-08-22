import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

proxyquire.noCallThru();

const mockProject = {
  repository: {
    ref: 'abc123',
  }
};

const mockRepository = {
  name: 'JS Personal API',
};

const mockResult = {
  data: () => mockRepository,
};

const projects = {
  getRepositoryRef: sinon.stub().returns(mockProject.repository.ref)
};

const services = {
  getDocumentById: sinon.stub()
    .withArgs(mockProject.repository.ref, 'repositories')
    .resolves(mockResult),
};

const joinRepoToProject = proxyquire('../../src/helpers/joinRepoToProject.js', {
  '../models/project': projects,
  '../database/services': services,
}).default;

describe('joinRepoToProject helper', async () => {
  it('it joins the requested repository', async () => {
    const result = await joinRepoToProject(mockProject);

    expect(result).to.deep.equal({
      ...mockProject,
      repository: {
        ...mockProject.repository,
        meta: mockRepository,
      },
    });
  });
});
