exports.create = function(){
  return new JSONConverter();
}

function JSONConverter(){
  this.toObject = function(body){
    if (body == "" ||  body == null) return {};
    return JSON.parse(body);
  }
  
  this.toString = function(object){
    if (!object || object == null ) return "";
    return JSON.stringify(object);
  }
}
