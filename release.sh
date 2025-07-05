#!/bin/bash

# Release script for fast-note-chrome extension
# Usage: ./release.sh <version>

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.0.0"
    exit 1
fi

echo "Creating release for version $VERSION"

# Clean and build
echo "Building extension..."
npm run build

# Create release directory
RELEASE_DIR="releases"
mkdir -p $RELEASE_DIR

# Create zip file
echo "Creating ZIP archive..."
cd dist
zip -r "../$RELEASE_DIR/fast-note-chrome-v$VERSION.zip" .
cd ..

# Create checksum
echo "Creating checksum..."
cd $RELEASE_DIR
sha256sum "fast-note-chrome-v$VERSION.zip" > "fast-note-chrome-v$VERSION.zip.sha256"
cd ..

echo "Release created successfully!"
echo "Files created:"
echo "- $RELEASE_DIR/fast-note-chrome-v$VERSION.zip"
echo "- $RELEASE_DIR/fast-note-chrome-v$VERSION.zip.sha256"
echo ""
echo "To create a GitHub release:"
echo "1. Create a new tag: git tag v$VERSION"
echo "2. Push the tag: git push origin v$VERSION"
echo "3. The GitHub Actions workflow will automatically create the release"
