module.exports.DirectoryWalker = DirectoryWalker;
//module.exports.testDirectoryWalker = testDirectoryWalker;

var path = require('path');
var fs = require('fs');

function DirectoryWalker(baseDirectory) {
  var absoluteBaseDirectory = path.resolve(baseDirectory);
  var isDirectory = fs.lstatSync(absoluteBaseDirectory).isDirectory();

  if (!isDirectory) {
    throw new Error("Path \"" + baseDirectory + "\"is not a directory.")
  }

  this.baseDirectory = absoluteBaseDirectory;
}


DirectoryWalker.prototype.walk = function(callback) {
  this.internalWalk(this.baseDirectory, callback);
}

DirectoryWalker.prototype.internalWalk = function(currentDirectory, callback) {

  var children = fs.readdirSync(currentDirectory);

  for (var index in children) {
    var childFileName = children[index];

    var absoluteChildPath = path.join(currentDirectory, childFileName);
    var isChildDirectory = fs.lstatSync(absoluteChildPath).isDirectory();

    var relativeChildPath = path.relative(this.baseDirectory, absoluteChildPath);

    callback({
      baseDirectory: this.baseDirectory,
      relativePath: relativeChildPath,
      absolutePath: absoluteChildPath,
      isDirectory: isChildDirectory
    });

    if (isChildDirectory) {
      this.internalWalk(absoluteChildPath, callback);
    }
  }
}

function testDirectoryWalker(directoryPath) {
  var dirWalker = new DirectoryWalker(directoryPath);

  dirWalker.walk(function(baseDirectory, currentPath, options) {
    var dirOrFile = options.isDirectory ? 'DIR  :' : 'FILE :';
    console.log(dirOrFile + ' ' + currentPath);
  });

}



