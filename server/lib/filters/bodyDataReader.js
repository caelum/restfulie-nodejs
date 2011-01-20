exports.create = function(){
  return new BodyDataReader();
}

function BodyDataReader(){
  this.execute = function(request,response,chain){
    request.body = "";
    if ("POST,PUT".indexOf(request.method) != -1) {
      request.setEncoding('utf8');
      request.on('data',function(data){
        request.body = data;
        chain.doChain(request,response);
      });
    } else {
      chain.doChain(request,response);
    }
    
  }
}
