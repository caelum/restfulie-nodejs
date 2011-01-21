var restfulie = require("../../lib/restfulie")

var clientes = [];
function ClientesResource(){
  
  this.index = function(){
    console.log("clientes");
    console.log(clientes);
    return clientes;
  }
  
  this.show = function(id){
  console.log("show"+id);
    return clientes[id];
  }
  
  this.destroy = function(id){
    console.log("destroy"+ id);
    delete clientes[id];
  }
  
  this.create = function(cliente){
    console.log("criar");
    console.log(cliente);
    clientes.push(cliente);
  }
  
  this.update = function(cliente,id){
  console.log("update");
    console.log(id);
    console.log(cliente);
    clientes[id] = cliente;
  }

}

server = restfulie.createServer();

server.registerResource(ClientesResource);
server.listen(3000,"127.0.0.1");

console.log("initialized.");

