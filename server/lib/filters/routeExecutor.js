exports.create = function (routeManager){
  return new RouteExecutor(routeManager);
}

function RouteExecutor(routeManager){

  this.execute = function(request,response,chain){
    route = routeManager.find(request.method,request.url);
    executer = bindRequestParams(request.data,route.logic);
    var retorno;
    eval(executer);
    response.data = retorno;
    chain.doChain(request,response);
  }
  
  // function discovery params of logic
  function argumentNames(fun) {
        var names = fun.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
            .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
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

