module.exports = walkInOrder;

var path = require('path');
var fs = require('fs');

function walkInOrder(filePath, callback) {
  var children = fs.readdirSync(filePath);

  for (var index in children) {
    var childPath = path.join(filePath, children[index]);
    var isDirectory = fs.lstatSync(childPath).isDirectory();

    callback(childPath, { isDir: isDirectory });

    if (isDirectory) {
      walkInOrder(childPath, callback);
    }
  }
}

