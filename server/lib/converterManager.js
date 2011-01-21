exports.create = function(){
  return new ConverterManager();
}

function ConverterManager(){

  converters = [];
  this.converters = converters;
  
  this.register = function(format,converter){
    converter.format = format;
    converters.push(converter);
  }
  
  this.getConverter = function(format){
    
    if (!format || format == "") 
      return null;
    
    format = format.split(";")[0];
    for (c in converters)
      if (converters[c].format == format) 
        return converters[c];
        
    return null;
  }
}
