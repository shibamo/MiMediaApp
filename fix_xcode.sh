#!/usr/bin/env bash
sed -i "" "s/iPhone Distribution/iPhone Developer/g" platforms/ios/cordova/build-release.xcconfig
exit 0;