exports.create = function(converterManager){
  return new ContentNegotiation(converterManager);
}

function ContentNegotiation(converterManager){
  
  this.execute = function(request,response,chain){
    if (request.data == null)
      request.data = {};
      
    converter = converterManager.getConverter(request.headers['content-type']);
    object = converter.toObject(request.body);

    enrichContent(request.data,object);

    chain.doChain(request,response);
    response.body = converter.toString(response.data);
  }
}

function enrichContent(data,objects){
  for (x in objects){
    if (data[x] == null || data[x]==undefined)
      data[x] = objects[x];
    else
      enrichContent(data[x],objects[x]);
  }
}
