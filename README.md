# todo-meister

This application is a simple todo list app, built for my [CVWO](https://github.com/CVWO) application.

## Details

| Name | Matriculation Number |
|:---|:---|
| Tan Siong Min, Benjamin | A0217960B |

## Backend

The backend is a Rails application, using PostgreSQL for the database.

I'm running the following versions locally, but any recent PostgreSQL release should work fine.

- Ruby: 2.6.6
- PostgreSQL: 11.9

### Setup

```sh
# If you have Nix installed, the configured Nix shell will install Ruby/PostgreSQL,
# and start a local PostgreSQL instance.
$ nix-shell
# Otherwise, manually install Ruby and PostgreSQL and start up PostgreSQL.
$ rails db:create
$ rails db:migrate
$ rails server
```

## Frontend

The frontend is a React application written in TypeScript, created using create-react-app.

### Setup

``` sh
# If you have Nix installed, the configured Nix shell will install Node.js.
$ nix-shell
# Otherwise, manually install Node.js.
$ npm install
$ npm start
```
