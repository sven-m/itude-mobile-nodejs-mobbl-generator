/* Module exports */

module.exports.patchPrototype = patchPrototype;

/* Patching object prototype */

function patchPrototype(constructor, propertyName, propertyValue) {
  Object.defineProperty(constructor.prototype, propertyName, { value: propertyValue });
}


