#!/bin/bash

if [ -z "$1" ]
  then
    # File containing the WebdriverIO configuration
    INPUT_FILE="./tests/config/wdio.shared.config.ts"

  # Check if the input file exists
  if [[ ! -f "$INPUT_FILE" ]]; then
    echo "Error: File '$INPUT_FILE' not found."
    exit 1
  fi

  # Extract suite names
  echo "Extracting suite names from $INPUT_FILE..."
  suites=$(grep -oP '(?!specs|capabilities|services|reporters)\b\w*?(?=[:]\s\[)' "$INPUT_FILE") 
  echo "$suites" 

  npm run ionic-e2e:build:android
  for suite in $suites; do
     SUITE=$suite npm run ionic-e2e:run:android
  done
else
    echo "Running suite: $1"
    npm run ionic-e2e:build:android && SUITE=$1 npm run ionic-e2e:run:android
fi
