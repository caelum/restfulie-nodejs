var testCase = require('nodeunit').testCase;
var restfulie = require('../../lib/restfulie')

var server;
module.exports = testCase({
    
    setUp : function(callback){
      server = restfulie.createServer();
      callback();
    },
    
    'should create restfulie server': function (assert) {
      assert.ok(server!= null);
      assert.done();
    },
    
    'should register route': function(assert){
      logic = function(){}
      server.registerRoute("GET","/client",logic);
      
      assert.equal(server.routes().length,1);
      assert.done();
    },
    
    'should register resource with routes at defaults operation' : function(assert){
      function ClientsResource(){
        this.index = function(){}
        this.destroy = function(client){}
        this.show = function(client){}
        this.create = function(client){}
        this.update = function(client){}
      }
      
      server.registerResource(ClientsResource);
      
      assert.equal(server.routes().length,5);
      
      assert.done();
    },
    
    'should register default filters' : function(assert){
      assert.ok(server.filters().length !=0);
      assert.done();
    },
    
    'should register default converters' : function(assert){
      assert.ok(server.converters().length !=0);
      assert.done();
    },
    
    'should listen server' : function(assert){
      executed = false;
      server.registerRoute("GET","/services",function(){
        executed = true;
        return {client:{id:1,name:"carlos"}}; 
      });
      server.listen(3000,"127.0.0.1");
      
      setTimeout(function(){
        client = require("http").createClient(3000, '127.0.0.1');
        
        var request = client.request('GET', '/services',{'content-type':'application/json'});
        request.end();
        request.on('response', function (response) {
          response.setEncoding('utf8')
          response.on('data',function(data){
            assert.ok(executed);
            resource = JSON.parse(data);
            assert.equal(resource.client.id,1);
            assert.equal(resource.client.name,'carlos');
            server.close();
            assert.done();
          });
        });
      },1);
    }
    
});
