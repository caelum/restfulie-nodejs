var testCase = require('nodeunit').testCase;
var contentNegotiation = require("../../../lib/filters/contentNegotiation")

var cn;
var converterManager;

module.exports = testCase({
    
    setUp : function(callback){
      converterManager = {};
      cn = contentNegotiation.create(converterManager);
      callback();
    },
    
    'should allow content negotiation request': function (assert) {
      request = {
        headers:{
          "content-type":"application/json;xsd=1"
        },
        body : '{"client":{"id":1,"name":"carlos"}}'
      };
      
      invoked = false;
      chain = {
        doChain : function(request,response){
        invoked = true;
        }
      };
      
      converterManager.getConverter = function(format){
        return {
          toObject : function(text){
            return JSON.parse(text);
          },
          toString : function(obj){
            if (!obj || obj == null ) return "";
            return JSON.stringify(obj);
          }
        }
      }
      
      response= {data:{name:'car'}};
      
      cn.execute(request,response,chain);
      assert.ok(request.data != null);
      assert.ok(request.data.client != null);
      assert.ok(request.data.client.id != null);
      assert.ok(request.data.client.name != null);
      assert.equal(request.data.client.id,1);
      assert.equal(request.data.client.name,'carlos');
      assert.ok(invoked);
      assert.equal(response.body,'{"name":"car"}');
      
      
      assert.done();
    },
    
    
    'should return response is content-type not defined or not supported' : function(assert){
      chain = {
        doChain : function(request,response){
        }
      };
      request = {
        headers : {}
      };
      response ={};
      
      converterManager.getConverter = function(format){
      }
      
      cn.execute(request,response,chain);
      assert.equal(response.statusCode,500);
      assert.equal(response.body,"content-type is not informed");
      assert.done();
    }
});
