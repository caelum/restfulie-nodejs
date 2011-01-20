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
  for (q in path.query){
    request.data[q] = path.query[q];
  }
}

exports.process = process;


