#!/bin/bash

# Input Parameters to this script
#   RPM_VERSION - The version to be used in the build. ex: 2.44
#   SSM_PARAMETER_NAME - The name of the build number parameter in AWS Systems Manager. ex:build-config-cbord-soa-build-number

# Get the given VERSION
RPM_VERSION=$1
SSM_PARAMETER_NAME=$2

# Pull the current build number from the AWS Systems Manager Parameter store
# Note: The following command is in double quotes, this is to remove
#       the line feeds and extra spaces, so that the next command is able to 
#       use the json.load() call inline.
#JSON_PARAM=$(aws ssm get-parameter --name ${SSM_PARAMETER_NAME})

#echo "JSON Parameter: $JSON_PARAM"

#BUILD_NUMBER=$(python -c "import json; print(json.loads('''${JSON_PARAM}''')['Parameter']['Value'])")

#Increment the build number by 1, then store the new value in the parameter store
#NEW_BUILD_NUMBER=$(($BUILD_NUMBER + 1))
#aws ssm put-parameter --name "${SSM_PARAMETER_NAME}" --type "String" --value "${NEW_BUILD_NUMBER}" --overwrite

# Concatinate the RPM_VERSION and NEW_BUILD_NUMBER
#RPM_VERSION="${RPM_VERSION}.${BUILD_NUMBER}"
RPM_VERSION="2.44.26"

# Updage the spec file with the proper version
sed -i "s/%VERSION%/$RPM_VERSION/g" ./SPECS/student.spec
sed -i "s/%RELEASE%/1/g" ./SPECS/student.spec

echo "**** Entered the build phase... ****"
echo "**** Triggering RPM build ****"
echo $BUILD_NUMBER
echo $RPM_VERSION
rpmbuild --define "_topdir `pwd`" --define "version $RPM_VERSION" --define "release 1" -bb ./SPECS/student.spec

