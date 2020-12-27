# Backend

The backend is a Rails application, using PostgreSQL for the database.

I'm running the following versions locally, but any recent PostgreSQL release should work fine.

- Ruby: 2.6.6
- PostgreSQL: 11.9

## Setup

```sh
$ cd backend

# If you have Nix installed, the configured Nix shell will install Ruby,
# all gem dependencies and PostgreSQL.
$ nix-shell
# Start the PostgreSQL server.
$ ./start_postgresql.sh

# Otherwise, manually install Ruby and PostgreSQL and start up PostgreSQL.
# Then install dependencies using Bundler.
$ bundle install

# Setup Solargraph for better development experience.
$ solargraph download-core
$ solargraph bundle

# Initialize Rails.
$ rails db:create
$ rails db:migrate
$ rails db:seed

# Start the app!
# Note: by default, the frontend assumes the backend API is running at localhost:8000
$ rails server --port 8000
```

## Deploy

The backend is deployed on [Heroku](https://todo-meister-api.herokuapp.com/) using [GitHub Actions](../.github/workflows/backend.yml). See [Heroku's Rails documentation](https://devcenter.heroku.com/articles/getting-started-with-rails6) for more information on the initial deploy steps.
