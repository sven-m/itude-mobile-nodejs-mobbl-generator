var replaceStream = require('replacestream');

function transform(intputStream, replacementMap) {
  var intermediateStream = inputStream;
  for (var originalValue in replacementMap) {
    var replacementValue = replacementMap[originalValue];

    intermediateStream = intermediateStream.pipe(replaceStream(originalValue, replacementValue);
  }

  return intermediateStream;
}

/* exports */
module.exports.replaceStreamMap = replaceStreamMap;
