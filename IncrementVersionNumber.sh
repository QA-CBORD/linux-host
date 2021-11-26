#!/bin/bash

# constants
env_file=src/environments/environment-data.ts

ios_file=ios/App/App/Info.plist
ios_key_1=CFBundleShortVersionString
ios_key_2=CFBundleVersion

android_file=android/app/build.gradle
android_key_1=versionCode
android_key_2=versionName

regex1="versionNumber:\ *\'\d+\.\d+\.\d+\'"
regex2="\d+\.\d+\.\d+"

# should we increment the minor version (third position)?
while getopts m flag
do
    case "${flag}" in
        m) incMinorVersion="1";;
    esac
done

# get current version
vString=$(cat $env_file | grep -Eo "$regex1" | grep -Eo "$regex2")
echo "Old Version: $vString"

# increment minor version if the flag is present
IFS='.' read -r -a parts <<< "$vString"
vCodePart2=$(printf '%02d' ${parts[1]})
if [ "${incMinorVersion}" == "1" ]
then
    part3="$((${parts[2]} + 1))"
    shortVstring="${parts[0]}.${parts[1]}.${part3}"
    vCodePart3=$(printf '%02d' ${part3})
else
    part3="$((${parts[1]} + 1))"
    shortVstring="${parts[0]}.${part3}.${parts[2]}"
    vCodePart3=$(printf '%02d' ${part3})
fi

echo "New Version: $shortVstring"

# Build the version code from the padded parts
versionCode="${parts[0]}${vCodePart2}${vCodePart3}${vCodePart4}"
echo "Version Code: $versionCode"

# replace version in environment file
sed -i '' "s/versionNumber: '${vString}'/versionNumber: '${shortVstring}'/" src/environments/environment-data.ts

# replace ios version
xmllint --noout --shell $ios_file << EOF 
cd //dict/key[text()="$ios_key_1"]//following-sibling::string[1]
set $shortVstring
cd //dict/key[text()="$ios_key_2"]//following-sibling::string[1]
set $shortVstring
save
EOF

# replace android version
sed -E -i '' "s/${android_key_1} [0-9]+/${android_key_1} ${versionCode}/" $android_file
sed -E -i '' "s/${android_key_2} \".*\"/${android_key_2} \"${shortVstring}\"/" $android_file

git add $env_file
git add $ios_file
git add $android_file

exit 0