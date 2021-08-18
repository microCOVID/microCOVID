#!/bin/bash

# See README.md for install/setup instructions for this script

# Set script to stop if any command fails or an undefined variable is accessed
set -euo pipefail

if ! command -v gh &> /dev/null; then
  echo "GitHub CLI could not be found, please install from https://cli.github.com/"
  exit
fi

KEYSTORE=".secure-keys"
source "$KEYSTORE"
if [ ! -f "$KEYSTORE" ]; then
  echo "$KEYSTORE does not exist. Please obtain an API key from https://apidocs.covidactnow.org/"
  exit
fi

# Update local branch
git checkout main
git pull

# Delete the remote branch. It usually doesn't exist unless the script failed last time.
git push origin --delete auto-update-prevalence &> /dev/null || true

# Delete the local branch & create new one
git branch -D auto-update-prevalence
git checkout -b auto-update-prevalence

# Activate the local virtual env.
source .venv/bin/activate
CAN_API_KEY=$CAN_API_KEY python3 update_prevalence.py

# Needed in order to fix some lint errors that come up from the JSON generated by update_prevalence.py
yarn fix

# Only proceed if files have been changed
# TODO(blanchardjeremy): Could use better error checking
if [[ `git status --porcelain` ]]; then
  TODAY=`date +%Y-%m-%d`
  git add -A
  git commit -am "Automatic prevalence update $TODAY"
  git push
  # Use the GitHub CLI to create a pull request and save the url
  PR_URL=`gh pr create --fill`
  echo "Pull request URL: $PR_URL"
  if [[ ! $PR_URL = "" ]]; then
    # Set the pull request to auto merge
    gh pr merge --auto --delete-branch --squash "$PR_URL"
  else
    echo "ERROR: No pull request URL generated"
    exit 2
  fi
else
  echo "ERROR: No changes to add to git commit, earlier script must have failed"
  exit 2
fi
