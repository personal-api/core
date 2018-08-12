import * as admin from 'firebase-admin';

import settings from './settings';

admin.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
});

const database = admin.firestore();
database.settings(settings);

export default database;
