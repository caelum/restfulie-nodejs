var testCase = require('nodeunit').testCase;
var filterManager = require("../../lib/filterManager")

var fm;

module.exports = testCase({
    
    setUp : function(callback){
      fm = filterManager.create();
      callback();
    },
    
    'should register filter': function (assert) {
      fm.register(function(request,response,chain){
      });
      assert.equal(fm.filters().length,1);
      assert.done();
    },
    
    'should execute filters' : function (assert){
      var request = {}, response = {}, numFiltersExecuted = 0, executedFor = [];
     
      fm.register({ execute : function(request,response,chain){
        numFiltersExecuted++;
        executedFor.push('request cookie');
        chain.doChain(request,response);
      }});
      
      fm.register({execute:function(request,response,chain){
        numFiltersExecuted++;
        executedFor.push('data reader');
        chain.doChain(request,response);
      }});
      
      fm.execute(request,response);
      
      assert.equal(numFiltersExecuted, 2);
      assert.equal(executedFor.toString(),['request cookie','data reader'].toString());
      assert.done();
    }
    
});
