# JS Personal API

> An API for my public data

[![codecov](https://codecov.io/gh/personal-api/core/branch/master/graph/badge.svg)](https://codecov.io/gh/personal-api/core) [![Build Status](https://travis-ci.org/personal-api/core.svg?branch=master)](https://travis-ci.org/personal-api/core) [![Join the chat at https://gitter.im/personal-api/core](https://badges.gitter.im/personal-api/core.svg)](https://gitter.im/personal-api/core?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpersonal-api%2Fcore.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpersonal-api%2Fcore?ref=badge_shield) 


JS Personal API is an opinionated Node.js and Express app that serves as an interface to my public data on various online networks and providers. The goal is to replace [the static data](https://chrisvogt.firebaseio.com/v1.json) I'm currently using for [my website](https://www.chrisvogt.me) with calls to this API.

_This project is new and unstable. Use at your discretion._

## » Install

Use npm to install dependencies.

```
npm install
```

Create a new file at `.env` containing your Firebase database credentials.

```
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_DATABASE_URL=https://YOUR_DATABASE_URL.firebaseio.com
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
```

## » Integrations

The providers I intended to integrate are:

###### GitHub

- [x] Repositories
- [x] Profile

###### Flikr

- [ ] Recent photos

###### Instagram

- [ ] Recent photos

###### Twitter

- [ ] Tweets

## » Endpoints

The endpoints available are:

| route | response |
|---|---|
| `GET /composite` | returns all collections |
| `GET /metas` | get all meta data |
| `GET /profiles` | get all profiles |
| `GET /projects` | get all projects (param `repository=expanded` includes repository data) |
| `GET /repositories` | get all repositories |

## » Commands

The `npm` commands available are:

| command | description |
|---|---|
| `build` | build project |
| `report-coverage` | run and report code coverage |
| `start` | starts the local web server |
| `sync:repositories` | get or sync repositories for all projects |
| `test` | runs the unit tests |

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpersonal-api%2Fcore.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpersonal-api%2Fcore?ref=badge_large)
