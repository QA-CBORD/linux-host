#!/bin/bash

if [ -z "$1" ]
  then
    # File containing the WebdriverIO configuration
    INPUT_FILE=$(find . -type f -name "wdio.shared.config.ts" 2>/dev/null | head -n 1)

  # Check if the input file exists
  if [[ ! -f "$INPUT_FILE" ]]; then
    echo "Error: File '$INPUT_FILE' not found."
    exit 1
  fi

  # Determine the appropriate grep command based on OS
  if [[ "$OSTYPE" == *darwin* ]] || [[ "$OSTYPE" == *macos* ]]; then
    GREP_COMMAND="ggrep -oP"
  else
    GREP_COMMAND="grep -oP"
  fi
  
  # Extract suite names using the determined grep command
  suites=$($GREP_COMMAND '(?!specs|capabilities|services|reporters)\b\w*?(?=[:]\s?\[)' "$INPUT_FILE")
  
  
  # suites="loginHostedStudent loginHostedGuest loginSSOGuest reportCardAsLost reportCardAsFound"
  suites="loginHostedStudent loginHostedGuest loginSSOGuest"
   
  echo "$suites"
  npm run ionic-e2e:build:android
  for suite in $suites; do
     echo -e "\n\n| *** Running suite: $suite *** |"
     SUITE=$suite npm run ionic-e2e:run:android
  done
else
    echo -e "\n\n| *** Running suite: $1 *** |"
    npm run ionic-e2e:build:android && SUITE=$1 npm run ionic-e2e:run:android
fi
