var urlUtils = require("url");
var queryStringDataReader = require("./queryStringDataReader");

exports.create = function(routeManager){
  return new PathDataReader(routeManager);
}

function PathDataReader(routeManager){
  this.execute = function(request,response,chain){
    if (request.data == null)
      request.data = {};

    processPathData(request,routeManager,chain);
    chain.doChain(request,response);
  }
  
}

function processPathData(request,routeManager){
  route = routeManager.find(request.method,request.url);
  var urlParts = urlUtils.parse(request.url).pathname.split("/");
  var uriParts = urlUtils.parse(route.uri).pathname.split("/");
  
  if (uriParts.length != urlParts.length) return false;
  
  
  var tempData = {};
  
  for (x in uriParts) {
    var uriPart = uriParts[x];
    var urlPart = urlParts[x];
    if (isParam(uriPart)){
      tempData[uriPart.replace('{','').replace('}','')] = urlPart;
    }
  }
  var url = "/?";
  for (x in tempData){
    url+=x;
    url+="=";
    url+=tempData[x];
    url+="&";
  }
  
  url = url.substr(0,url.length-1);
  
  queryStringDataReader.process({"url":url,data : request.data});
}


function isParam(part){
  return part.indexOf('{') == 0 && part.indexOf("}") == part.length-1;
}

  
