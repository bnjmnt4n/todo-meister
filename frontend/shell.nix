{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [
    nodejs-14_x
    nodePackages.typescript-language-server
    nodePackages.eslint
  ];
}
