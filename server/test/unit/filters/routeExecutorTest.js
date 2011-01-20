var testCase = require('nodeunit').testCase;
var routeExecutor = require("../../../lib/filters/routeExecutor")

var rm,re;

module.exports = testCase({
    
    setUp : function(callback){
      rm = {};
      re = routeExecutor.create(rm);
      callback();
    },
    
    'should finding route at request and execute route': function (assert) {
      mydata = {
        client: {
          id:1
        },
        name:'jose'
      };
      request = {method:"GET",url:"/services/1?name=jose",header:{},data:mydata};
      response = {};

      logicExecuted = false;
      
      rm.find = function(){
        return {
          uri:"/services/{client.id}",
          method:"GET",
          logic: function(client,name){
            assert.equal(client.id,1);
            assert.equal(name,'jose');
            logicExecuted = true;
            return 'retorno';
          }
        };
      }
      chainInvoked = false;
      chain = {doChain : function(){
        chainInvoked = true;
      }};

      re.execute(request,response,chain);

      assert.ok(logicExecuted);
      assert.ok(chainInvoked)
      assert.equal(response.body, 'retorno');
      
      assert.done();
    },
    
    'should invoke chain':function(assert){
      request = {};
      response = {};
      
      rm.find = function(){
        return {
          uri:"/services/{client.id}",
          method:"GET",
          logic: function(){
          }
        };
      }
      chainInvoked = false;
      chain = {doChain : function(){
        chainInvoked = true;
      }};

      re.execute(request,response,chain);

      assert.ok(chainInvoked)
      
      assert.done();
    }
    
});
