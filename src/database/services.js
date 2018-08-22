import db from '.';

export const getAllDocuments = async (collectionName) => {
  const documents = [];

  const collection = await db
    .collection(collectionName)
    .get();

  collection.forEach((doc) => {
    documents.push(doc.data());
  });

  return documents;
};

export const getDocumentById = async (id, collectionName) => {
  if (!id) {
    return {};
  }

  const docRef = await db
    .collection(collectionName)
    .doc(id);
  const doc = docRef.get();

  return doc;
};

export const getDocumentRefById = async (id, collectionName) => {
  if (!id) {
    return {};
  }

  const docRef = await db
    .collection(collectionName)
    .doc(id);

  return docRef;
};
