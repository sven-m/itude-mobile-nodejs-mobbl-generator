// iOS MOBBL project generator

/* command line stuff */

var assert = require('assert');

var program = require('commander');

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

function applyTable(table, fn) {
  function reduceCallback(intermediateResult, currentValue, index, array) {
    var currentKey = array[index];
    var currentValue = table[currentKey];

    return fn(intermediateResult, currentKey, currentValue, table);
  }

  return Array.prototype.reduce.call(Object.keys(table), reduceCallback, this);
}

Object.defineProperty(Object.prototype, 'applyTable', { value: applyTable });


var fs = require('fs')

var templatePath = './templates/ios-app-template/';
var stagePath = '/tmp/generated-project';

if (fs.existsSync(stagePath)) {
  console.log(stagePath + ' already exists');
  process.exit(1);
}

var path = require('path');


function walkInOrder(filePath, callback) {
  var children = fs.readdirSync(filePath);

  for (var index in children) {
    console.log(children);
    console.log(filePath);
    assert.equal(typeof children[index], 'string')
    console.log("FP: %s, CH: %s", filePath, children);
    var childPath = path.join(filePath, children[index]);
    var isDirectory = fs.lstatSync(childPath).isDirectory();

    callback(childPath, { isDir: isDirectory });

    if (isDirectory) {
      walkInOrder(childPath, callback);
    }
  }
}

var replaceStream = require('replacestream');
var istextorbinary = require('istextorbinary');

fs.mkdirSync(stagePath, '0755');

walkInOrder(templatePath, function(filePath, attributes) {
  assert.equal(typeof filePath, 'string');
  assert.equal(typeof attributes, 'object');

  var isDirectory = attributes.isDir;
  var isText = !isDirectory && istextorbinary.isTextSync(filePath, fs.readFileSync(filePath));
  var targetPath = path.join(stagePath, path.relative(templatePath, filePath));
  var processedPath = targetPath.applyTable(replacements, function(intermediateResult, currentKey, currentValue, replacementsTable) {
    console.log("INT: " + intermediateResult);
    regex = new RegExp(currentKey, 'g');
    return intermediateResult.replace(regex, currentValue);
  });
  
  console.log('%s%s filePath: %s', (isDirectory?'d':' '), (isText?'t':(!isDirectory?'b':' ')), processedPath);

  if (isDirectory) {
    fs.mkdirSync(processedPath, '0755');
  }
  
  else if (isText) {
    console.log("copying from %s to %s", filePath, processedPath);
    var readStream = fs.createReadStream(filePath);
    var writeStream = fs.createWriteStream(processedPath);

    readStream.on('error', function(err) {
      console.log(err);
    });

    writeStream.on('error', function(err) {
      console.log(err);
    });
    
    readStream = readStream.applyTable(replacements, function(intermediateResult, currentKey, currentValue) {
      return intermediateResult.pipe(replaceStream(currentKey, currentValue));
    });

    readStream.pipe(writeStream);
  } else {
    console.log("copying from %s to %s", filePath, processedPath);
    var readStream = fs.createReadStream(filePath);
    var writeStream = fs.createWriteStream(processedPath);

    readStream.on('error', function(err) {
      console.log(err);
    });

    writeStream.on('error', function(err) {
      console.log(err);
    });

    readStream.pipe(writeStream);
  }

});

//fs.readFile('./templates/ios-app-template/', 'utf8', function (err,data) {
//  if (err) {
//    return console.log(err);
//  }
//  var result = data.replace(/string to be replaced/g, 'replacement');
//
//  fs.writeFile(someFile, result, 'utf8', function (err) {
//    if (err) return console.log(err);
//  });
//});
