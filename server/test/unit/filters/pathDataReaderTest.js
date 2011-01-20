var testCase = require('nodeunit').testCase;
var pathDataReader = require("../../../lib/filters/pathDataReader")

var dr;

module.exports = testCase({
    
    setUp : function(callback){
      rm = {};
      dr = pathDataReader.create(rm);
      callback();
    },
    
    'should read data path param at request': function (assert) {
      request = {method:"GET",url:"/services/1/carlos"};
      
      rm.find = function(method,request){
        return {method:"GET",uri:"/services/{client.id}/{client.name}"};
      };
      
      chain = {
        doChain : function(request,response){
        }
      };

      dr.execute(request,response,chain);
      
      assert.ok(request.data !=null);
      assert.ok(request.data.client !=null);
      assert.ok(request.data.client.id !=null);
      assert.ok(request.data.client.name !=null);
      assert.equal(request.data.client.id,1);
      assert.equal(request.data.client.name,'carlos');

      assert.done();
    },
    
});
