#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <minor|patch>"
  exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Please switch to the main branch."
  exit 1
fi

git fetch origin
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo
elif [ $LOCAL = $BASE ]; then
  echo "Your branch is behind the remote branch. Please pull the latest changes."
  exit 1
elif [ $REMOTE = $BASE ]; then
  echo "Your branch has unpushed changes. Please push your changes."
  exit 1
else
  echo "Your branch and the remote branch have diverged. Please resolve the conflicts."
  exit 1
fi


LAST_TAG=$(git tag --sort=-v:refname | head -n 1)

IFS='.' read -r -a TAG_PARTS <<< "$LAST_TAG"

if [ "$1" == "minor" ]; then
  TAG_PARTS[1]=$((TAG_PARTS[1] + 1))
  TAG_PARTS[2]=0
elif [ "$1" == "patch" ]; then
  TAG_PARTS[2]=$((TAG_PARTS[2] + 1))
else
  echo "Invalid argument: $1. Use 'minor' or 'patch'."
  exit 1
fi

NEW_TAG="${TAG_PARTS[0]}.${TAG_PARTS[1]}.${TAG_PARTS[2]}"

# confirm new tag with y or n "Current tag: (new line)New tag: (new line)Continue? (y/n) i whant tag in bold text"
echo "Current: $LAST_TAG"
echo "New tag: $NEW_TAG"
echo
read -p "Continue? (y/n) "

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
else
    git tag $NEW_TAG > /dev/null 2>&1
    git push origin $NEW_TAG > /dev/null 2>&1

    echo "New tag $NEW_TAG pushed to origin."
fi