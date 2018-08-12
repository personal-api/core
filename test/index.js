import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const stubServer = sinon.stub();
const index = proxyquire('../src/index.js', {
  './server': stubServer
});

describe('index.js', () => {
  it('it returns the server', () => {
    expect(index.default).to.deep.equal(stubServer);
  });
});
