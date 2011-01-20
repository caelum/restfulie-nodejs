exports.create = function(){
  return new FilterManager();
}

function FilterManager(){
  var filters = [];

  this.filters = function(){ 
    return filters;
  }

  this.register = function(filter){
    filters.push(filter);
  }
  
  this.execute = function(request,response){
    if (filters.length ==0) return;
    var index = 0;
    
    var chain;
    
    chain = {
      doChain: function(request,response){
        index++;
        if (index < filters.length)
          filters[index](request,response,chain);
      }
    };
    
    filters[index](request,response,chain);
  }
}
