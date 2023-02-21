# Return to root
cd ..

git fetch --all
git fetch --tags
git reset --hard

# get the name of the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# switch to the develop branch and update it
git checkout develop
git pull

# switch back to the original branch and merge the changes
git checkout $CURRENT_BRANCH
git rebase develop
