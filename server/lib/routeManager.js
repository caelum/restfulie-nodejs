var urlUtils = require("url");

exports.create = function(){
  return new RouteManager();
}

function RouteManager(){
  
  var routes = [];
  
  this.routes = function(){
    return routes;
  }
  
  this.register = function(route){
    routes.push(route);
  }
  
  this.find = function(method,url){
    for (index in routes){
      route = routes[index];
      if (route.method != method) continue;

      if (addressIsEqual({"uri":route.uri,"url" : url}))
        return route;
    }
  }
  
  function addressIsEqual(address){
    var urlParts = urlUtils.parse(address.url).pathname.split("/");
    var uriParts = urlUtils.parse(address.uri).pathname.split("/");
    
    if (uriParts.length != urlParts.length) return false;
    
    for (x in uriParts) {
      uriPart = uriParts[x];
      urlPart = urlParts[x];
      if (isParam(uriPart)){
        urlParts[x] = uriPart;
      }
    }
    return urlParts.toString() == uriParts.toString();
  }
  
  function isParam(part){
    return part.indexOf('{') == 0 && part.indexOf("}") == part.length-1;
  }
}
