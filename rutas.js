var registroController = require("./api/controladores/registroController").registroController

var obligalogin=function(request, response, callback){
    if(request.session.rol == undefined){
        response.json({state: false, mensaje:"Debe iniciar sesión"})
    } else {
        return callback()
    }
}

var permisosAdmin = function(request, response, callback){
    if(request.session.rol != 2){
        response.json({state: false, mensaje:"Esto solo lo puede hacer el administrador"})
    } else {
        return callback()
    }
}

app.post("/registro/guardar", function (request, response) {
    registroController.guardar(request, response)
})

app.post("/registro/listar",  function (request, response) {
    registroController.listar(request, response)
})

app.post("/registro/login", function (request, response) {
    registroController.login(request, response)
})

// app.post("/registro/minuta", function (request, response) {
//     registroController.registroactividad(request, response)
// })

app.post("/registro/actualizarpassword", function (request, response) {
    registroController.actualizarpassword(request, response)
})

app.post("/registro/eliminarUsuario",  function (request, response) {
   registroController.eliminarUsuario(request, response)
})

app.post("/registro/actualizarDatos",  function(request, response){
    registroController.actualizarDatos(request,response)
})

app.post("/registro/buscarId",  function(request, response){
    registroController.buscarId(request,response)
})

app.post("/registro/estado", function(request, response){
    response.json(request.session)
})

app.post("/registro/cerrarSesion", function(request, response){
    request.session.destroy()
    response.json({state: true, mensaje: "se cerró la sesión"})
})

app.post("/registro/crearRapido", function(request, response){
    registroController.crearRapido(request, response)
})

var obligalogin=function(request, response, callback){
    if(request.session.rol == undefined){
        response.json({state: false, mensaje:"Debe iniciar sesión"})
    } else {
        return callback()
    }
}

var permisosAdmin = function(request, response, callback){
    if(request.session.rol != 2){
        response.json({state: false, mensaje:"Esto solo lo puede hacer el administrador"})
    } else {
        return callback()
    }
}


var productoController = require("./api/controladores/productoController.js").productoController

app.post("/producto/guardar", function (request, response) {
    productoController.guardar(request, response)
})

app.post("/producto/listar", function (request, response) {
    productoController.listar(request, response)
})

app.post("/producto/buscarId",  function(request, response){
    productoController.buscarId(request, response)
})

app.post("/producto/eliminarProducto",  function (request, response) {
   productoController.eliminarProducto(request, response)
})

app.post("/producto/actualizarProducto", function(request, response){
    productoController.actualizarProducto(request,response)
})