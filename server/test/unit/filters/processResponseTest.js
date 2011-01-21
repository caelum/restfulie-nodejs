var testCase = require('nodeunit').testCase;
var processResponse = require("../../../lib/filters/processResponse")

var dr;

module.exports = testCase({
    
    setUp : function(callback){
      dr = processResponse.create();
      callback();
    },
    
    'should write response': function (assert) {
      request = {method:"PUT"};
      invokeWriteHead = false;
      invokeEnd = false;
      
      response = {
        headers : {
          'content-type':'application/json'
        },
        body : "{'id':1}",
        logicalName : 'create',
        statusCode: 200,
        writeHead : function(status, headers){
          invokeWriteHead = true;
        },
        end : function(data){
          invokeEnd = true;
        }
      };

      dr.execute(request,response,chain);
      
      assert.ok(invokeEnd);
      assert.ok(invokeWriteHead);
      assert.done();
    }
});
