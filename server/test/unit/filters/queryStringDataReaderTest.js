var testCase = require('nodeunit').testCase;
var dataReader = require("../../../lib/filters/queryStringDataReader")

var dr;

module.exports = testCase({
    
    setUp : function(callback){
      dr = dataReader.create();
      callback();
    },
    
    'should read data querystring path param at request': function (assert) {
      request = {method:"GET",url:"/services?client.id=1&client.name=carlos"};

      invoked = false;
      chain = {
        doChain : function(request,response){
          invoked = true;
        }
      };

      dr.execute(request,response,chain);
      
      assert.ok(request.data !=null);
      assert.ok(request.data.client !=null);
      assert.ok(request.data.client.id !=null);
      assert.ok(request.data.client.name !=null);
      assert.equal(request.data.client.id,1);
      assert.equal(request.data.client.name,'carlos');
      assert.ok(invoked);
      assert.done();
    }
});

