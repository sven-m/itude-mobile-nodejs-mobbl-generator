// iOS MOBBL project generator

/* internal dependencies */
var ProjectGenerator = require('./lib/projectgenerator');

/* external dependencies */
var program = require('commander');

program
    .version('0.1')
    .option('-p, --project-name <name>', 'The name of the iOS project')
    .parse(process.argv);

var iosPathTransforms = {
  '__PROJECT_NAME__': 'my-generated-app-project',
  '__CLASS_PREFIX__': 'GEN'
};

var androidPathTransforms = {
  '__PROJECT_NAME__': 'my-generated-app-project',
  '^src/': 'src/com/example/',
};


var textTransforms = {
  '__PROJECT_NAME__': 'my-generated-app-project',
  '__BUNDLE_DISPLAY_NAME__': 'My Generated App',
  '__BUNDLE_IDENTIFIER__': 'com.example',
  '__COMMENT_HEADING__': 'These comments were automatically generated!',
  '__CLASS_PREFIX__': 'GEN',
  '__MVN_ARTIFACT_ID__': 'my-generated-app-project',
  '__MVN_GROUP_IDENTIFIER__': 'com.example',
  '__MVN_PROJECT_DESCRIPTION__': 'This project demonstrates the use case of generated app projects',
  '__MVN_PROJECT_URL__': 'http://example.com/',
  '__MVN_INCEPTION_YEAR__ ': '2014',
  '__ORGANIZATION_NAME__': 'My Generated Company Ltd.',
  '__MVN_ORGANIZATION_URL__': 'http://www.example.com/',
  '__MVN_PRODUCT_LICENSE__': 'The Generated Software License',
  '__MVN_LICENSE_URL__': 'LICENSE',
  '__MVN_DEVELOPER_NAME__': 'P. Generator'
};

var templatePathPerPlatform = {
  ios : './templates/ios-app-template/',
  android : './templates/android-app-template/'
};

var targetPathPerPlatform = {
  ios : '/tmp/generated-ios-project/',
  android : '/tmp/generated-android-project/'
}

var iosGenerator = new ProjectGenerator({
  templateDirectory: templatePathPerPlatform.ios,
  targetDirectory: targetPathPerPlatform.ios,
  pathTransforms: iosPathTransforms,
  textTransforms: textTransforms
});

iosGenerator.generate();


var androidGenerator = new ProjectGenerator({
  templateDirectory: templatePathPerPlatform.android,
  targetDirectory: targetPathPerPlatform.android,
  pathTransforms: androidPathTransforms,
  textTransforms: textTransforms
});

androidGenerator.generate();
