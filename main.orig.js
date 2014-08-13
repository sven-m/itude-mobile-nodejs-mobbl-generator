// iOS MOBBL project generator

var helpers = require('./lib/helpers');
var walkInOrder = require('./lib/dirwalker');

var assert = require('assert');
var path = require('path');
var program = require('commander');

(function () {
  var applyTable = require('./lib/applyTable');
  helpers.patchPrototype(Object, 'applyTable', applyTable);
}());

/* command line stuff */

program
    .version('0.1')
    .option('-p, --project-name <name>', 'The name of the iOS project')
    .parse(process.argv);

/* application specific stuff! yeah! */

var replacements = {
  '__PROJECT_NAME__': 'my-generated-project',
  '__BUNDLE_DISPLAY_NAME__': 'My Generated App',
  '__BUNDLE_IDENTIFIER__': 'my.generated.bundle.identifier',
  '__COMMENT_HEADING__': 'yeah comments!',
  '__CLASS_PREFIX__': 'MGP',
  '__MVN_ARTIFACT_ID__': 'my-generated-project',
  '__MVN_GROUP_IDENTIFIER__': 'my.maven.group.identifier',
  '__MVN_PROJECT_DESCRIPTION__': 'My Maven Project Description',
  '__MVN_PROJECT_URL__': 'http://my.project/url',
  '__MVN_INCEPTION_YEAR__ ': '9999',
  '__ORGANIZATION_NAME__': 'My Generated Organization',
  '__MVN_ORGANIZATION_URL__': 'http://my.organization/url',
  '__MVN_PRODUCT_LICENSE__': 'My Generated License',
  '__MVN_LICENSE_URL__': 'http://my.license/url',
  '__MVN_DEVELOPER_NAME__': 'My Developer Name'
};

var fs = require('fs');

var templatePathPerPlatform = {
  ios : './templates/ios-app-template/',
  android : './templates/android-app-template/'
};
var stagePathPerPlatform = {
  ios : '/tmp/generated-ios-project/',
  android : '/tmp/generated-android-project/'
}

var replaceStream = require('replacestream');
var istextorbinary = require('istextorbinary');

var templatePath;
var stagePath; 
var platforms = ['ios', 'android'];

for (var platform in platforms) {
  templatePath = templatePathPerPlatform[platforms[platform]];
  stagePath = stagePathPerPlatform[platforms[platform]];

  if (fs.existsSync(stagePath)) {
    console.log(stagePath + ' already exists');
    process.exit(1);
  }

  console.log("STAGEPATH: " + platform);

  fs.mkdirSync(stagePath, '0755');

  walkInOrder(templatePath, function (filePath, attributes) {
    assert.equal(typeof filePath, 'string');
    assert.equal(typeof attributes, 'object');

    var isDirectory = attributes.isDir;
    var isText = !isDirectory && istextorbinary.isTextSync(filePath, fs.readFileSync(filePath));
    var targetPath = path.join(stagePath, path.relative(templatePath, filePath));
    var processedPath = targetPath.applyTable(replacements, function (intermediateResult, currentKey, currentValue, replacementsTable) {
      console.log("INT: " + intermediateResult);
      regex = new RegExp(currentKey, 'g');
      return intermediateResult.replace(regex, currentValue);
    });

    console.log('%s%s filePath: %s', (isDirectory ? 'd' : ' '), (isText ? 't' : (!isDirectory ? 'b' : ' ')), processedPath);

    var readStream = null;
    var writeStream = null;

    if (isDirectory) {
      fs.mkdirSync(processedPath, '0755');
    }


    else if (isText) {
      console.log("copying from %s to %s", filePath, processedPath);
      readStream = fs.createReadStream(filePath);
      writeStream = fs.createWriteStream(processedPath);

      readStream.on('error', function (err) {
        console.log(err);
      });

      writeStream.on('error', function (err) {
        console.log(err);
      });

      readStream = readStream.applyTable(replacements, function (intermediateResult, currentKey, currentValue) {
        return intermediateResult.pipe(replaceStream(currentKey, currentValue));
      });

      readStream.pipe(writeStream);
    } else {
      console.log("copying from %s to %s", filePath, processedPath);
      readStream = fs.createReadStream(filePath);
      writeStream = fs.createWriteStream(processedPath);

      readStream.on('error', function (err) {
        console.log(err);
      });

      writeStream.on('error', function (err) {
        console.log(err);
      });

      readStream.pipe(writeStream);
    }

  });
}
