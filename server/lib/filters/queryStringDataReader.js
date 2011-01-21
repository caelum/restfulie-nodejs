var urlUtils = require("url");

exports.create = function(){
  return new QueryStringDataReader();
}

function QueryStringDataReader(){
  this.execute = function(request,response,chain){
   process(request);
   chain.doChain(request,response);
  }
}

function process(request){
  if (request.data == null)
     request.data = {};
  path = urlUtils.parse(request.url,true);

  enrichContent(request.data,path.query);
}

function enrichContent(data,objects){
  for (x in objects){
    if (data[x] == null || data[x]==undefined)
      data[x] = objects[x];
    else
      enrichContent(data[x],objects[x]);
  }
}

exports.process = process;


