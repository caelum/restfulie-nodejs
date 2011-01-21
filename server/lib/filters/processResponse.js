exports.create = function(){
  return new ProcessResponse();
}

function ProcessResponse(){
  this.execute = function(request,response,chain){
    chain.doChain(request,response);
    
    if (response.logicalName == "create" && request.method == "PUT") {
      response.statusCode = 201;
      response.headers['location'] = "end";
    }
    response.headers['content-length'] = response.body.length;
    response.writeHead(response.statusCode, response.headers);
    response.end(response.body);
  }
}
