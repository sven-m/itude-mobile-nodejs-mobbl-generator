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
var path = require('path');

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
    ios     : path.join(__dirname, 'templates/ios-app-template/'),
    android : path.join(__dirname, 'templates/android-app-template/')
  };

  if (parameters.platform.ios) {
    var iosProjectName = parameters.projectName.replace('*', 'ios');

    var iosGenerator = new ProjectGenerator({
      templateDirectory: templatePathPerPlatform.ios,
      targetDirectory: path.resolve(parameters.targetPath, iosProjectName),
      pathTransforms: {
        '__PROJECT_NAME__': iosProjectName,
        '__CLASS_PREFIX__': parameters.classPrefix
      },
      textTransforms: {
        '__PROJECT_NAME__': iosProjectName,
        '__BUNDLE_DISPLAY_NAME__': parameters.appName,
        '__BUNDLE_IDENTIFIER__': parameters.packageName,
        '__COMMENT_HEADING__': 'comment',
        '__CLASS_PREFIX__': parameters.classPrefix,
        '__MVN_ARTIFACT_ID__': iosProjectName,
        '__MVN_GROUP_IDENTIFIER__': parameters.packageName,
      }
    });

    iosGenerator.generate();
  }

  if (parameters.platform.android) {
    var androidProjectName = parameters.projectName.replace('*', 'android');

    var androidGenerator = new ProjectGenerator({
      templateDirectory: templatePathPerPlatform.android,
      targetDirectory: path.resolve(parameters.targetPath, androidProjectName),
      pathTransforms: {
        '__PROJECT_NAME__': parameters.projectName,
        '^src/' : 'src/' + parameters.packageName.replace(/\./g, '/') + '/'
      },
      textTransforms: {
        '__PROJECT_NAME__': androidProjectName,
        '__BUNDLE_DISPLAY_NAME__': parameters.appName,
        '__BUNDLE_IDENTIFIER__': parameters.packageName,
        '__COMMENT_HEADING__': 'comment',
        '__MVN_ARTIFACT_ID__': androidProjectName,
        '__MVN_GROUP_IDENTIFIER__': parameters.packageName,
      }
    });

    androidGenerator.generate();
  }
}
