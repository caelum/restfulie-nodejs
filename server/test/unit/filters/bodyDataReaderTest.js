var testCase = require('nodeunit').testCase;
var bodyDataReader = require("../../../lib/filters/bodyDataReader")

var dr;

module.exports = testCase({
    
    setUp : function(callback){
      dr = bodyDataReader.create();
      callback();
    },
    
    'should read data body sended at request': function (assert) {
      request = {
        method:"POST",
        url:"/services/1/carlos",
        on : function(event,callback){
          callback("data sended");
        },
        setEncoding : function(){}
      };
      
      invoked = false;
      chain = {
        doChain : function(request,response){
        invoked = true;
        }
      };

      dr.execute(request,response,chain);
      
      assert.ok(request.body !=null);
      assert.equal(request.body,'data sended');
      assert.ok(invoked);
      assert.done();
    },
    
});
