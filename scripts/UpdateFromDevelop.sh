# Return to root
cd ..

git fetch --all
git fetch --tags
git reset --hard

# Get latest from develop
git pull origin develop
git push