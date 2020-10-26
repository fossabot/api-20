<h1 align="center"><a href="https://api.thream.divlo.fr/docs">Thream/api</a></h1>

<p align="center">
  <strong>Thream's application programming interface to stay close with your friends and communities.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ts-standard"><img alt="TypeScript Standard Style" src="https://camo.githubusercontent.com/f87caadb70f384c0361ec72ccf07714ef69a5c0a/68747470733a2f2f62616467656e2e6e65742f62616467652f636f64652532307374796c652f74732d7374616e646172642f626c75653f69636f6e3d74797065736372697074"/></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FThream%2Fapi?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FThream%2Fapi.svg?type=shield"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <img src="https://github.com/Thream/api/workflows/Node.js%20CI/badge.svg" alt="Node.js CI" />
</p>


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FThream%2Fapi.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FThream%2Fapi?ref=badge_large)

## 📜 About

Thream's application programming interface to stay close with your friends and communities.

See [Thream/website](https://github.com/Thream/website/) for visual overview of the features of the project.

This project was bootstrapped with [create-fullstack-app](https://github.com/Divlo/create-fullstack-app).

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 14
- [npm](https://www.npmjs.com/) >= 6
- [MySQL](https://www.mysql.com/) >= 5.7

### Installation

```sh
# Clone the repository
git clone https://github.com/Thream/api.git

# Go to the project root
cd api

# Install dependencies
npm install
```

You will need to configure the environment variables by creating an .env file at the root of the project (see `.env.example`).

### Usage (development environment)

#### With [docker](https://www.docker.com/)

```sh
# Setup and run all the services for you
docker-compose up --build
```

**Services started :**

- API : `http://localhost:8080`
- [phpmyadmin](https://www.phpmyadmin.net/) : `http://localhost:8000`
- [MailDev](https://maildev.github.io/maildev/) : `http://localhost:1080`
- [MySQL database](https://www.mysql.com/) (with PORT 3006)

#### Without docker

```sh
# Start the API server (http://localhost:8080)
npm run dev
```

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or even correct a simple spelling mistake.

The steps to contribute can be found in the [CONTRIBUTING.md](./.github/CONTRIBUTING.md) file.

## 📄 License

[MIT](./LICENSE)