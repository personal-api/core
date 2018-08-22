import { expect } from 'chai';
import { getLastUpdateDate } from '../../src/models/repository';

const repositoryFixture = {
  updated_at: new Date(),
};

describe('model: repository getters', () => {
  describe('getLastUpdateDate', () => {
    const lastUpdated = getLastUpdateDate(repositoryFixture);
    expect(lastUpdated).to.equal(repositoryFixture.updated_at);
  });
});
