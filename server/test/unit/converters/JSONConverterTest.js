var testCase = require('nodeunit').testCase;
var jsonConverter = require("../../../lib/converters/JSONConverter")


module.exports = testCase({
    
    setUp : function(callback){
      cv = jsonConverter.create();
      callback();
    },
    
    'should converter String in javascript object': function (assert) {
      obj = cv.toObject('{"client":{"ID": 1}}');
      assert.equal(obj.client.ID,1);
      assert.done();
    },
    
    'should converter object in string' : function (assert){
      obj = {"client":{"ID": 1}};
      body = cv.toString(obj);
      assert.equal(body,'{"client":{"ID":1}}');
      assert.done();
    }
});
