var testCase = require('nodeunit').testCase;
var routeManager = require('../../lib/routeManager');

var rm;

module.exports = testCase({
    
    setUp : function(callback){
      rm = routeManager.create();
      callback();
    },
    
    'should register route': function (assert) {
      rm.register({
        method : "GET",
        uri : "/services",
        logic : function(){}
      });
      
      assert.equal(rm.routes().length,1);
      assert.equal(rm.routes()[0].method,"GET");
      assert.equal(rm.routes()[0].uri,"/services");
      assert.done();
    },
    
    'should finding route at url' : function(assert){
      rm.register({
        method : "GET",
        uri: "/services/{client.id}",
        logic : function(){}
      });
      
      route = rm.find("GET","/services/2332?promoCode=15458");
      
      assert.ok(route!=null);
      assert.equal(route.method,"GET");
      assert.equal(route.uri,"/services/{client.id}");
      assert.done();
    }
});
