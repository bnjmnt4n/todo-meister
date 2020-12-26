with (import <nixpkgs> {});
let
  env = bundlerEnv {
    name = "cvwo-bundler-env";
    inherit ruby;
    gemfile  = ./Gemfile;
    lockfile = ./Gemfile.lock;
    gemset   = ./gemset.nix;
  };
in stdenv.mkDerivation {
  name = "cvwo";
  buildInputs = [
    bundix
    env
    env.wrappedRuby
    postgresql
  ];
  # Initialize a local PostgreSQL instance.
  # Based on https://gist.github.com/sebastian-stephan/d2013204e62070e5a56bc4f5415559a2.
  shellHook = ''
    export PGDATA=$PWD/postgres_data
    export PGHOST=$PWD/postgres
    export LOG_PATH=$PWD/postgres/LOG
    export PGDATABASE=postgres
    export DATABASE_URL="postgresql:///postgres?host=$PGHOST"
    if [ ! -d $PGHOST ]; then
      mkdir -p $PGHOST
    fi
    if [ ! -d $PGDATA ]; then
      echo 'Initializing postgresql database...'
      initdb $PGDATA --auth=trust >/dev/null
    fi
  '';
}
