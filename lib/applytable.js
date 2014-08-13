module.exports = applyTable;

function applyTable(table, fn) {
  function reduceCallback(intermediateResult, currentValue, index, array) {
    var currentKey = array[index];
    var currentValue = table[currentKey];

    return fn(intermediateResult, currentKey, currentValue, table);
  }

  return Array.prototype.reduce.call(Object.keys(table), reduceCallback, this);
}

