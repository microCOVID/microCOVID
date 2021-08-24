#!/bin/bash

###
# Usage: prevalence_helper.sh
# Parameters:
#      -b = Run the script on the current branch (instead of checking out $BRANCH)
#      -c = Commit changes and submit a pull request
# See README.md for install/setup instructions for this script

# Set script to stop if any command fails or an undefined variable is accessed
set -euo pipefail

if ! command -v gh &> /dev/null; then
  echo "GitHub CLI could not be found, please install from https://cli.github.com/"
  exit
fi

# Set defaults
COMMIT_AND_PULL_REQUEST=0
STAY_ON_CURRENT_BRANCH=0
CAN_API_KEY=""
VIRTUAL_ENV_DIR=".venv"

while getopts "bck:v:" OPTION; do
    case $OPTION in
    b)
        STAY_ON_CURRENT_BRANCH=1
        ;;
    c)
        COMMIT_AND_PULL_REQUEST=1
        ;;
    k)
        CAN_API_KEY=${OPTARG}
        ;;
    v)
        VIRTUAL_ENV_DIR=${OPTARG}
        echo "Using a manual virtualenv directory: $VIRTUAL_ENV_DIR"
        ;;
    *)
        ;;
    esac
done


# Prefer the manually passed in API key over the KEYSTORE file
if [[ $CAN_API_KEY == "" ]]; then
  # Load the API key
  KEYSTORE=".secure-keys"
  echo "Loading keystore file: $KEYSTORE"
  source "$KEYSTORE"

  if [ ! -f "$KEYSTORE" ]; then
    echo "You must either pass in the COVIDActNow.org API Key either as the first pameter to this script (yarn prevalence a123a123a123 or specify it in $KEYSTORE file does not exist. Please obtain an API key from https://apidocs.covidactnow.org/"
    exit
  fi
fi

if [[ $STAY_ON_CURRENT_BRANCH != 1 ]]; then
  echo "Creating a branch based on main"
  # Update local branch
  git checkout main
  git pull

  BRANCH=auto-update-prevalence-$(date +%Y-%m-%d--%H-%M-%S)
  git checkout -b $BRANCH
  echo "Created branch $BRANCH"
fi


# Activate the local virtual env
[[ "$VIRTUAL_ENV" == "" ]]; INVENV=$?
if [[ $INVENV == 1 ]]; then
  echo "Activating the virtualenv"
  FULL_VENV_COMMAND = "$VIRTUAL_ENV_DIR/bin/activate"
  echo "Activating virtulenv: $FULL_VENV_COMMAND"
  source "$VIRTUAL_ENV_DIR/bin/activate"
else
  echo "Virtualenv already active"
fi

# Run the update script
echo "Running prevalence script"
CAN_API_KEY=$CAN_API_KEY python3 update_prevalence.py

# Needed in order to fix some lint errors that come up from the JSON generated by update_prevalence.py
yarn fix

# exit early if commit isn't needed
if [[ $COMMIT_AND_PULL_REQUEST == 0 ]]; then
  exit 0
fi


echo "Committing the files and submitting an auto-merge pull request"

# Only proceed if files have been changed
# TODO(blanchardjeremy): Could use better error checking
if [[ `git status --porcelain` ]]; then
  TODAY=$(date +%Y-%m-%d)

  git add -A
  git commit -am "Automatic prevalence update $TODAY"
  git push
  # Use the GitHub CLI to create a pull request and save the url
  PR_URL=$(gh pr create --fill)
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
