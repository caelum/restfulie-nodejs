var routeManager = require("./routeManager")
var http = require("http")
var filterManager = require("./filterManager")
var converterManager = require("./converterManager")
var bodyDataReader = require("./filters/bodyDataReader")
var contentNegotiation = require("./filters/contentNegotiation")
var pathDataReader = require("./filters/pathDataReader")
var queryStringDataReader= require("./filters/queryStringDataReader")
var routeExecutor = require("./filters/routeExecutor")
var processResponse = require("./filters/processResponse")
var JSONConverter = require("./converters/JSONConverter")

exports.createServer = function(){
  return new Restfulie();
}

function Restfulie(){

  var routesManager = routeManager.create();
  var filtersManager = filterManager.create();
  var convertersManager = converterManager.create();
  var server=null;
  
  convertersManager.register("application/json",JSONConverter.create());
  filtersManager.register(processResponse.create());
  filtersManager.register(bodyDataReader.create());
  filtersManager.register(contentNegotiation.create(convertersManager));
  filtersManager.register(queryStringDataReader.create());
  filtersManager.register(pathDataReader.create(routesManager));
  filtersManager.register(routeExecutor.create(routesManager));
    
  this.filters = function(){
    return filtersManager.filters();
  }
  
  this.use = function(filter){
    filtersManager.register(filter);
  }
  
  this.converters = function(){
    return convertersManager.converters;
  }
  
  this.registerResource = function(resource){
    object_resource = new resource();
    baseuri = functionName(resource).toLowerCase().replace("resource","");
    
    if (object_resource.index != null)
      this.registerRoute("GET","/"+baseuri,object_resource.index);

    if (object_resource.destroy != null)
      this.registerRoute("DELETE","/"+baseuri+"/{id}",object_resource.destroy);

    if (object_resource.show != null)
      this.registerRoute("GET","/"+baseuri+"/{id}",object_resource.show);

    if (object_resource.create != null)
      this.registerRoute("POST","/"+baseuri,object_resource.create);

    if (object_resource.update != null)
      this.registerRoute("PUT","/"+baseuri,object_resource.update);
      
  }
  
  this.registerRoute = function(method,uri,logic){
    routesManager.register({
        'method' : method,
        'uri' : uri,
        'logic' : logic
      });
  }
  
  this.routes = function (){
    return routesManager.routes();
  }
  
  
  this.listen = function(port,ip){
    server = http.createServer(function(request,response){
      filtersManager.execute(request,response);
    });
    server.listen(port,ip);
  }
  
  this.close = function(){
    server.close();
  }

}


function functionName(fn){
  var name=/\W*function\s+([\w\$]+)\(/.exec(fn);
  if(!name)return '';
  return name[1];
}
