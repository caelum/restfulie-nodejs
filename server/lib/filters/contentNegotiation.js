exports.create = function(converterManager){
  return new ContentNegotiation(converterManager);
}

function ContentNegotiation(converterManager){
  
  this.execute = function(request,response,chain){
    if (request.data == null)
      request.data = {};
      
    if (request.headers['content-type'] == null){
      response.statusCode = 500;
      response.body = "content-type is not informed";
      return;
    }
    
    converter = converterManager.getConverter(request.headers['content-type']);

    if (converter == null) {
      response.statusCode = 500;
      response.body = "content-type is not supported";
      return;
    }
    
    object = converter.toObject(request.body);

    enrichContent(request.data,object);
 
    chain.doChain(request,response);

    if (response.headers == null)
      response.headers = {};
  
    if (response.headers['content-type'] == null)
      response.headers['content-type'] = request.headers['content-type'];

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
