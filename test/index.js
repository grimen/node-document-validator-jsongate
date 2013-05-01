
var Validator = require('node-document-validator');

module.exports = Validator.Spec('JSONGate', {
  module: require('..'),
  engine: require('json-gate'),
  options: {}
});
