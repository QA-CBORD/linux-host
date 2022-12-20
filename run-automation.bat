@echo off

IF "-z" "%~1" (
  echo "You must pass the suite name"
  exit
)
npm "run" "ionic-e2e:build:android" && SUITE=$1 npm "run" "ionic-e2e:run:android"
