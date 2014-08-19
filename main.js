/* Module: main
 *
 * (C) Copyright Itude Mobile B.V., The Netherlands
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* internal dependencies */
var ProjectGenerator = require('./lib/projectgenerator');
var userchoice = require('./lib/userchoice');

/* external dependencies */
//var program = require('commander');
var prompt = require('prompt');

//program
//.version('0.1')
//.option('-p, --project-name <name>', 'The name of the iOS project')
//.parse(process.argv);

prompt.start();

userchoice.getUserChoice(function(result) {
  generateProject(result);
});

function generateProject(parameters) {
  var templatePathPerPlatform = {
    ios     : './templates/ios-app-template/',
    android : './templates/android-app-template/'
  };

  var targetPathPerPlatform = {
    ios     : '/tmp/generated-ios-project/',
    android : '/tmp/generated-android-project/'
  }

  if (parameters.platform.ios) {
    var iosGenerator = new ProjectGenerator({
      templateDirectory: templatePathPerPlatform.ios,
      targetDirectory: targetPathPerPlatform.ios,
      pathTransforms: {
        '__PROJECT_NAME__': parameters.projectName,
        '__CLASS_PREFIX__': parameters.classPrefix
      },
      textTransforms: {
        '__PROJECT_NAME__': parameters.projectName,
        '__BUNDLE_DISPLAY_NAME__': parameters.appName,
        '__BUNDLE_IDENTIFIER__': parameters.packageName,
        '__COMMENT_HEADING__': 'comment',
        '__CLASS_PREFIX__': parameters.classPrefix,
        '__MVN_ARTIFACT_ID__': parameters.projectName,
        '__MVN_GROUP_IDENTIFIER__': parameters.packageName,
      }
    });

    iosGenerator.generate();
  }

  if (parameters.platform.android) {
    var androidGenerator = new ProjectGenerator({
      templateDirectory: templatePathPerPlatform.android,
      targetDirectory: targetPathPerPlatform.android,
      pathTransforms: {
        '__PROJECT_NAME__': parameters.projectName,
        '^src/' : 'src/' + parameters.packageName.replace(/\./g, '/') + '/'
      },
      textTransforms: {
        '__PROJECT_NAME__': parameters.projectName,
        '__BUNDLE_DISPLAY_NAME__': parameters.appName,
        '__BUNDLE_IDENTIFIER__': parameters.packageName,
        '__COMMENT_HEADING__': 'comment',
        '__MVN_ARTIFACT_ID__': parameters.projectName,
        '__MVN_GROUP_IDENTIFIER__': parameters.packageName,
      }
    });

    androidGenerator.generate();
  }
}
