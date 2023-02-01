#!/bin/bash
# Get the current version number
current_version=$(grep -o -E 'versionNumber:.*' src/environments/environment-data.ts | awk '{print $2}' | tr -d "',")

# Increment the last segment of the version number
IFS='.' read -r -a array <<< "$current_version"
last_segment=$((array[2] + 1))
new_version="${array[0]}.${array[1]}.$last_segment"

# Update the version number in environment-data.ts
sed -i '' "s/versionNumber:.*/versionNumber: '$new_version',/g" src/environments/environment-data.ts

# Update the version number in the android/app/build.gradle
sed -i '' "s/versionName \".*\"/versionName \"$new_version\"/g" android/app/build.gradle
version_code="$(echo $new_version | awk -F. '{printf("%d%02d%02d",$1,$2,$3)}')"

sed -i '' "s/versionCode .*/versionCode $version_code/g" android/app/build.gradle

# Update the version number in the Info.plist
plist=ios/App/App/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $new_version" $plist
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $new_version" $plist

# Commit the changes
git add src/environments/environment-data.ts android/app/build.gradle ios/App/App/Info.plist
