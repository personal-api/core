import { expect } from 'chai';
import getProject, {
  getName,
  getRepositoryProviderId,
  getRepositoryRef
} from '../../src/models/project';

const projectFixture = {
  name: 'js-personal-api',
  repository: {
    provider: 'github',
    providerId: 144503664,
    ref: '1RTQoq4uqT2e8dzoBcGc'
  }
};

describe('model: project getters', () => {
  describe('getProject', () => {
    it('returns the project object with all expected transformations', () => {
      const project = getProject(projectFixture);
      expect(project).to.deep.equal(projectFixture);
    });
  });

  describe('getName', () => {
    it('returns the project name', () => {
      const name = getName(projectFixture);
      expect(name).to.deep.equal(projectFixture.name);
    });
  });

  describe('getRepositoryProviderId', () => {
    it('returns the repository provider id', () => {
      const providerId = getRepositoryProviderId(projectFixture);
      expect(providerId).to.deep.equal(projectFixture.repository.providerId);
    });
  });

  describe('getRepositoryRef', () => {
    it('returns the repository provider reference', () => {
      const ref = getRepositoryRef(projectFixture);
      expect(ref).to.deep.equal(projectFixture.repository.ref);
    });
  });
});
