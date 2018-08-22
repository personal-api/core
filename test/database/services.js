import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();

const mockDocument = { name: 'testDoc' };
const documentObj = {
  data: () => mockDocument,
};

const getStub = sandbox.stub();
const docStub = sandbox.stub().returns({ get: getStub });
const collectionStub = sandbox.stub().returns({ doc: docStub, get: getStub });

const {
  getAllDocuments,
  getDocumentById,
  getDocumentRefById,
} = proxyquire
  .noCallThru()
  .load('../../src/database/services.js', {
    './': {
      collection: collectionStub,
    },
});

describe('database services', async () => {
  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('getAllDocuments', () => {
    let allDocuments;

    beforeEach(async () => {
      getStub.resolves([documentObj, documentObj]);
      allDocuments = await getAllDocuments('projects');
    });

    it('queries the requested collection', () => {
      expect(collectionStub.args).to.deep.equal([['projects']]);
    });

    it('returns the data for each document', () => {
      expect(allDocuments).to.deep.equal([mockDocument, mockDocument]);
    });
  });

  describe('getDocumentById', () => {
    let queriedDoc;

    beforeEach(() => {
      getStub.resolves(mockDocument);
    });

    it('fails if called without an id', async () => {
      queriedDoc = await getDocumentById();
      expect(queriedDoc).to.deep.equal({});
    });

    it('queries the requested collection by name', async () => {
      queriedDoc = await getDocumentById('xyz', 'projects');
      expect(collectionStub.args).to.deep.equal([['projects']]);
    });

    it('queries the requested doc by id', async () => {
      queriedDoc = await getDocumentById('xyz', 'projects');
      expect(docStub.args).to.deep.equal([['xyz']]);
    });
  });

  describe('getDocumentRefById', () => {
    let queriedDoc;

    it('fails if called without an id', async () => {
      queriedDoc = await getDocumentRefById();
      expect(queriedDoc).to.deep.equal({});
    });

    it('queries the requested collection by name', async () => {
      queriedDoc = await getDocumentRefById('xyz', 'projects');
      expect(collectionStub.args).to.deep.equal([['projects']]);
    });

    it('queries the requested doc by id', async () => {
      queriedDoc = await getDocumentRefById('xyz', 'projects');
      expect(docStub.args).to.deep.equal([['xyz']]);
    });
  });
});
