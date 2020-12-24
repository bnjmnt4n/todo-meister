with import <nixpkgs> {};

(bundlerEnv {
  name = "rails_app";
  gemdir = ./.;
}).env
