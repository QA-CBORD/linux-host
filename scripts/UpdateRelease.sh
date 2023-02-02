#!/bin/bash
# FUNCTIONS 
get_tickets() {
    # Compare the branches and get the commit hash and commit message
    commits=$(git log --pretty=format:"%h %s" $release_branch...develop)

    # Initialize an empty variable to store unique occurrences
    unique_tickets=""

    # Print the commit hash and commit message
    echo "Commit    |  Message"
    echo "----------|----------------"
    while read -r commit; do
        local hash=$(echo $commit | awk '{print $1}')
        local message=$(echo $commit | awk '{$1=""; print $0}')
        # Get the unique occurrences of GET-[0-9]+|RC-[0-9]+
        local occurrence=$(echo $message | grep -E -o "(GET|get|RC|rc)-[0-9]{4}" | uniq)
        # Remove any spaces or line breaks
        occurrence=$(echo $occurrence | tr -d '\r\n\t')
        # Check if the occurrence is not already in the unique_tickets variable
        if [[ ! $unique_tickets =~ $occurrence ]]; then
            unique_tickets="$unique_tickets $occurrence"
            echo "$hash | $message"
        fi
    done <<< "$commits"
}
# MAIN
# Assign the webhook URL to a variable
webhook_url=$1
env_file=src/environments/environment-data.ts

info_plist_path=ios/App/App/Info.plist
ios_key_1=CFBundleShortVersionString
ios_key_2=CFBundleVersion

android_file=android/app/build.gradle
android_key_1=versionCode
android_key_2=versionName
# Return to root
cd ..

git fetch --all
git fetch --tags
git reset --hard

# Get latest from develop
git checkout develop
git pull origin develop

# Pull highest latest release branch
release_branch=$(git branch -r | grep -E 'release-1*' | sort -n | tail -n 1) || exit 1
echo "Current release $release_branch"

git checkout $release_branch
git pull origin $release_branch
# Get the current version number
current_version=$(grep -o -E 'versionNumber:.*' src/environments/environment-data.ts | awk '{print $2}' | tr -d "',")
# Increment the patch version number
IFS='.' read -r -a array <<< "$current_version"
last_segment=$((array[2] + 1))
new_version="${array[0]}.${array[1]}.$last_segment"

# Checkout patch release branch from release and update from develop
rc_branch="release/$new_version"
git show-ref --verify --quite refs/heads/$rc_branch || git branch $rc_branch
git checkout $rc_branch
git pull origin $rc_branch

current_patch_version=$(grep -o -E 'versionNumber:.*' src/environments/environment-data.ts | awk '{print $2}' | tr -d "',")
git merge develop

git diff $rc_branch $release_branch > difference.txt || exit 1
if [ -s difference.txt ] ; then
    echo "There are differences between develop and $release_branch"

    if [ "$current_patch_version" == "$current_version" ]; then
        echo "Updating version files."
        # Update the version number in environment-data.ts
        sed -i "s/versionNumber:.*/versionNumber: '$new_version',/g" $env_file

        # Update the version number in the android/app/build.gradle
        sed -i "s/versionName \".*\"/versionName \"$new_version\"/g" $android_file
        version_code="$(echo $new_version | awk -F. '{printf("%d%02d%02d",$1,$2,$3)}')"
        sed -i "s/versionCode .*/versionCode $version_code/g" $android_file

        # Update the version number in the Info.plist
        awk -v current_version="$current_version" -v new_version="$new_version" '{gsub(current_version, new_version)};{print}' $info_plist_path > temp.plist && mv temp.plist $info_plist_path
        
        # Commit and push the changes
        git add src/environments/environment-data.ts android/app/build.gradle ios/App/App/Info.plist
        git commit -m "Increment version to $new_version"
    fi

    git push origin $rc_branch
    echo "Trying to post to $webhook_url"
    # TODO: Add PR creation code below
    # Extract JIRA ticket numbers from commit messages
    get_tickets
    echo "Tickets to build: $unique_tickets"
    # Send the results to the webhook URL
    curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"There are new changes to release.\",\"source\":\"Bitbucket\",\"version\":\"$new_version\",\"tickets\":\"$unique_tickets\"}" $webhook_url
else
    echo "No differences found between develop and $release_branch"
    curl -X POST -H 'Content-type: application/json' --data '{"text":"No changes to release.", "source":"Bitbucket"}' $webhook_url
fi