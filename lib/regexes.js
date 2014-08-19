var ALPHANUMERIC_HYPHEN_UNDERSCORE_REGEX = /^[a-zA-Z0-9-_]+/;
var DOMAIN_NAME_LIKE_REGEX = /^([a-z]+(\.[a-z]+)*)?$/;

module.exports.alphanumeric_hyphen_underscore = ALPHANUMERIC_HYPHEN_UNDERSCORE_REGEX;
module.exports.domain_name_like = DOMAIN_NAME_LIKE_REGEX;
