#!/bin/bash

VERSION=$(jq -r .version "./package.json")
echo "Version $VERSION"
git fetch --tags
LAST_VERSION=$(git tag -l "v$VERSION-rc*" | sort -V | tail -n1)

if [ -n "$LAST_VERSION" ]; then
  npx semver "$LAST_VERSION" # Validate semver of last version
  echo "Found last tagged version $LAST_VERSION"
  TAG=$(npx semver -i prerelease "$LAST_VERSION")
else
  TAG="$VERSION-rc.0"
fi

echo "Tagging next pre-release v$TAG"
git tag "v$TAG"

npm publish --access public