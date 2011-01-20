var testCase = require('nodeunit').testCase;
var converterManager = require("../../lib/converterManager")

var cm;

JSONConverter = {
  toObject : function(body){
    if (body == "" ||  body == null) return {};
    return JSON.parse(body);
  },
  toString : function(object){
    if (body == null ) return "";
    return JSON.stringify(object);
  }
};

module.exports = testCase({
    
    setUp : function(callback){
      cm = converterManager.create();
      callback();
    },
    
    'should register converter': function (assert) {
      cm.register("application/json",JSONConverter);
      assert.equal(cm.converters.length,1);
      assert.done();
    },
    
    'should retrive converter registred' : function (assert){
      cm.register("application/json",JSONConverter);
      converter = cm.getConverter('application/json');
      assert.equal(converter,JSONConverter);
      assert.done();
    }
});
