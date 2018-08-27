# JS Personal API

> An API for my public data

[![codecov](https://codecov.io/gh/chrisvogt/js-personal-api/branch/master/graph/badge.svg)](https://codecov.io/gh/chrisvogt/js-personal-api) [![Build Status](https://travis-ci.org/chrisvogt/js-personal-api.svg?branch=master)](https://travis-ci.org/chrisvogt/js-personal-api) [![Join the chat at https://gitter.im/chrisvogt/js-personal-api](https://badges.gitter.im/chrisvogt/js-personal-api.svg)](https://gitter.im/chrisvogt/js-personal-api?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fchrisvogt%2Fjs-personal-api.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fchrisvogt%2Fjs-personal-api?ref=badge_shield) 


JS Personal API is an opinionated Node.js and Express app that serves as an interface to my public data collected from various online sources. The goal is to replace [the static data](https://chrisvogt.firebaseio.com/v1.json) I'm currently using for [my website](https://www.chrisvogt.me) with calls to this API.

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
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fchrisvogt%2Fjs-personal-api.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fchrisvogt%2Fjs-personal-api?ref=badge_large)
