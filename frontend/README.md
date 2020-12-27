# Frontend

The frontend is a React application written in TypeScript, created using create-react-app.

## Setup

```sh
$ cd frontend

# If you have Nix installed, the configured Nix shell will install Node.js.
$ nix-shell
# Otherwise, manually install Node.js.

# Install dependencies.
$ npm install

# Start the app!
$ npm start
# To customize the backend URL, modify `.env` or run:
$ REACT_APP_BACKEND_API="http://URL:PORT" npm start
```

## Deploy

The frontend is deployed on [Netlify](https://todo-meister.netlify.app/) using [GitHub Actions](../.github/workflows/frontend.yml).
