exports.create = function(converterManager){
  return new ContentNegotiation(converterManager);
}

function ContentNegotiation(converterManager){
  
  this.execute = function(request,response,chain){
    if (request.data == null)
      request.data = {};
      
    converter = converterManager.getConverter(request.headers['content-type']);
    object = converter.toObject(request.body);
    
    for (x in object){
      request.data[x] = object[x];
    }
    
    chain.doChain(request,response);
  }
}


