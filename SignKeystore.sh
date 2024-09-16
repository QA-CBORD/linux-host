#!/bin/bash

android_file=android/gradle.properties
key_alias=provision_app_keyAlias
store_password=provision_app_storePassword
key_password=provision_app_keyPassword

echo "Signing keystore"

sed -E -i '' -e "s/${key_alias}=/${key_alias}=${KEY_ALIAS}/" \
             -e "s/${store_password}=/${store_password}=${KEYSTORE_PASSWORD}/" \
             -e "s/${key_password}=/${key_password}=${KEY_PASSWORD}/" \
              $android_file
exit 0