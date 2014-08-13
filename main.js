// iOS MOBBL project generator

/* internal dependencies */
var program = require('commander');
var ProjectGenerator = require('./lib/projectgenerator');

/* external dependencies */
var fs = require('fs');
var path = require('path');
var assert = require('assert');


/* command line stuff */

program
    .version('0.1')
    .option('-p, --project-name <name>', 'The name of the iOS project')
    .parse(process.argv);

/* application specific stuff! yeah! */


var iosPathTransforms = {
  '__PROJECT_NAME__': 'itude-mobile-ios-mobbl-custom-view-controller-sample',
  '__CLASS_PREFIX__': 'CVC'
};

var androidPathTransforms = {
  '__PROJECT_NAME__': 'itude-mobile-ios-mobbl-custom-view-controller-sample',
  '^src/': 'src/com/itude/mobile/mobbl/customviewcontrollersample/',
};


var textTransforms = {
  '__PROJECT_NAME__': 'itude-mobile-ios-mobbl-custom-view-controller-sample',
  '__BUNDLE_DISPLAY_NAME__': 'Custom View Controller Sample App',
  '__BUNDLE_IDENTIFIER__': 'com.itude.mobile.mobbl.customviewcontrollersample',
  '__COMMENT_HEADING__': 'yeah comments!',
  '__CLASS_PREFIX__': 'CVC',
  '__MVN_ARTIFACT_ID__': 'itude-mobile-ios-mobbl-custom-view-controller-sample',
  '__MVN_GROUP_IDENTIFIER__': 'com.itude.mobile.ios.mobbl',
  '__MVN_PROJECT_DESCRIPTION__': 'This project demonstrates the use case of custom view controllers',
  '__MVN_PROJECT_URL__': 'http://mobbl.org/',
  '__MVN_INCEPTION_YEAR__ ': '2014',
  '__ORGANIZATION_NAME__': 'Itude Mobile B.V.',
  '__MVN_ORGANIZATION_URL__': 'http://www.itude.com/',
  '__MVN_PRODUCT_LICENSE__': 'The Apache Software License, Version 2.0',
  '__MVN_LICENSE_URL__': 'LICENSE',
  '__MVN_DEVELOPER_NAME__': 'Sven Meyer'
};

var templatePathPerPlatform = {
  ios : './templates/ios-app-template/',
  android : './templates/android-app-template/'
};

var targetPathPerPlatform = {
  ios : '/tmp/generated-ios-project/',
  android : '/tmp/generated-android-project/'
}

//var iosGenerator = new ProjectGenerator({
  //templateDirectory: templatePathPerPlatform.ios,
  //targetDirectory: targetPathPerPlatform.ios,
  //pathTransforms: iosPathTransforms,
  //textTransforms: textTransforms
//});

//iosGenerator.generate();


var androidGenerator = new ProjectGenerator({
  templateDirectory: templatePathPerPlatform.android,
  targetDirectory: targetPathPerPlatform.android,
  pathTransforms: androidPathTransforms,
  textTransforms: textTransforms
});

androidGenerator.generate();
