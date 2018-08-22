import chalk from 'chalk';

import constants from '../constants';
import db from '../database';

import {
  getName,
  getRepositoryProviderId,
  getRepositoryRef,
} from '../models/project';
import { getLastUpdateDate } from '../models/repository';
import { getDocumentRefById } from '../database/services';
import getRepo from '../models/dataSource/GitHub/getRepo';

const {
  APP_NAME,
  COLLECTIONS: {
    PROJECTS,
    REPOSITORIES,
  },
  STRINGS: {
    CREATED_NEW_REPOSITORY,
    SYNCED_NAMED_REPOSITORY,
    SYNCING_BANNER,
  },
} = constants;

const syncAllRepositories = async () => {
  const projectsRef = db.collection(PROJECTS);
  const repositoriesRef = db.collection(REPOSITORIES);

  console.log(chalk.bgBlueBright(APP_NAME), SYNCING_BANNER);

  projectsRef.get().then(async (snapshot) => {
    snapshot.docs.forEach(async (doc) => {
      const project = doc.data();

      const name = getName(project);
      const providerId = getRepositoryProviderId(project);
      const ref = getRepositoryRef(project);

      if (providerId) {
        const repository = await getRepo(providerId);
        const updatedAt = getLastUpdateDate(repository);

        if (ref) {
          const projectRef = await getDocumentRefById(doc.id, PROJECTS);
          const repositoryRef = await getDocumentRefById(ref, REPOSITORIES);

          await repositoryRef.set(repository, { merge: true });
          await projectRef.set({
            synced: new Date(),
            updated: new Date(updatedAt),
          }, { merge: true });

          console.log(
            chalk.bgGreenBright(chalk.black('SUCCESS')),
            SYNCED_NAMED_REPOSITORY.replace('$NAME', name),
          );
        }

        if (!ref) {
          repositoriesRef.add(repository).then(async (res) => {
            await projectsRef.doc(doc.id).set({
              repository: {
                ref: res.id,
              },
              synced: new Date(),
              updated: new Date(updatedAt),
            }, { merge: true });

            console.log(
              chalk.bgGreenBright(chalk.black('SUCCESS')),
              CREATED_NEW_REPOSITORY.replace('$NAME', name),
            );
          });
        }
      }
    });
  });
};

syncAllRepositories();
