#!/bin/bash

if [ -z "$1" ]
  then
    echo "You must pass the suite name"
    exit
fi

npm run ionic-e2e:build:android && SUITE=$1 npm run ionic-e2e:run:android