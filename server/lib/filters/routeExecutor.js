exports.create = function (routeManager){
  return new RouteExecutor(routeManager);
}

function RouteExecutor(routeManager){

  this.execute = function(request,response,chain){
    route = routeManager.find(request.method,request.url);
    
    
    if (route == null) {
      response.data = "";
      response.statusCode = 404;
      chain.doChain(request,response);
      return;
    }
    response.logicalName = functionName(route.logic);
    executer = bindRequestParams(request.data,route.logic);
    var retorno;
    try {
      eval(executer);
      response.data = retorno;
      response.statusCode =  200;
      response.statusCode = retorno == null && request.method == "GET" ? 404 : 200;
    } catch (e){
      console.log(e.message);
      console.log(e.stack);
      response.data = "";
      response.statusCode = 500;
    }

    chain.doChain(request,response);
    
  }
  
  // function discovery params of logic
  function argumentNames(fun) {
        var names = fun.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
            .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
  }
  
  

function functionName(fn){
  var name=/\W*function\s+([\w\$]+)\(/.exec(fn);
  if(!name)return '';
  return name[1];
}
  
  function bindRequestParams(data,logic){
    var args = argumentNames(logic);
    var executer = "route.logic,";
    for (x in args)
      executer+= "request.data['"+args[x]+"'],"
    executer = executer.substr(0,executer.length-1);
    executer = "retorno = route.logic.call("+executer+")";
    return executer;
  }
}

