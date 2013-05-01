require('sugar');
var util = require('util');

// HACK: ...until Node.js `require` supports `instanceof` on modules loaded more than once. (bug in Node.js)
var Validator = global.NodeDocumentValidator || (global.NodeDocumentValidator = require('node-document-validator'));

// -----------------------
//  DOCS
// --------------------
//  - https://github.com/akidee/schema.js

// -----------------------
//  Constructor
// --------------------

// new JSONGate ()
// new JSONGate (options)
function JSONGate () {
  var self = this;

  self.klass = JSONGate;
  self.klass.super_.apply(self, arguments);

  self.engine = require('json-gate');
}

util.inherits(JSONGate, Validator);

// -----------------------
//  Class
// --------------------

JSONGate.defaults = {
  options: {}
};

JSONGate.options = Object.clone(JSONGate.defaults.options, true);

JSONGate.reset = Validator.reset;

// -----------------------
//  Instance
// --------------------

// #validate (attributes)
// #validate (attributes, options)
// #validate (attributes, callback)
// #validate (attributes, options, callback)
JSONGate.prototype.validate = function() {
  var self = this;

  self._validate(arguments, function(attributes, schema, options, done) {
    var result;

    try {
      self.engine.createSchema(schema).validate(attributes);
    } catch(err) {
      result = err;
    }

    var errors = result ? [result] : null;
    var valid = Object.isEmpty(errors || {});

    done(errors, valid);
  });
};

// -----------------------
//  Export
// --------------------

module.exports = JSONGate;
