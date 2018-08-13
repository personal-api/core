import db from './';

export const getAllDocuments = async collectionName => {
  const documents = [];

  const collection = await db
    .collection(collectionName)
    .get();

  collection.forEach(doc => {
    documents.push(doc.data())
  });

  return documents;
};

export const getDocumentById = async (id, collectionName) => {
  if (!id) {
    return;
  }

  return await db
    .collection(collectionName)
    .doc(id)
    .get();
};

export const getDocumentRefById = async (id, collectionName) => {
  if (!id) {
    return;
  }

  return await db
    .collection(collectionName)
    .doc(id);
};
