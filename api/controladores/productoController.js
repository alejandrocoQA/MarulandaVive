const { response } = require("express")
const { request } = require("http")

var productoController = {}
var productoModel = require("../modelos/productoModel.js").productoModel

productoController.guardar = function(request, response){
    var prod = {
        nombre_prod: request.body.nombre_prod,
        cod_prod: request.body.cod_prod,
        cantidad_pro: request.body.cantidad_pro,

    }
    
    if (prod.cod_prod == null || prod.cod_prod == undefined || prod.cod_prod == "") {
        response.json({ state: false, mensaje: "El código del producto es necesario" })
        return false
    }

    if (prod.nombre_prod == null || prod.nombre_prod == undefined || prod.nombre_prod == "") {
        response.json({ state: false, mensaje: "El nombre del producto es necesario" })
        return false
    }

    productoModel.buscar(prod, function (posicion) {
        if (posicion.length == 0){
            console.log(posicion.length)
            productoModel.guardar(prod, function (respuesta){
                response.json(respuesta)
            })
        } else {
            response.json({state: false, mensaje: "Este código ya está asignado a un prodcuto, por lo tanto no es posible continuar, asegurate de colocar un código nuevo al producto"})
            return false
        }
    })
}

productoController.listar= function(request, response){
    productoModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

productoController.actualizarProducto = function(request, response){
    var prod = {
        nombre_prod: request.body.nombre_prod,
        cod_prod: request.body.cod_prod,
        cantidad_pro: request.body.cantidad_pro,
        estado:request.body.estado
      
    }

    if (prod.cod_prod == null || prod.cod_prod == undefined || prod.cod_prod == "") {
        response.json({ state: false, mensaje: "El código del producto es necesario, para hacer una actualización" })
        return false
    }

    // productoModel.buscar(prod, function (posicion){
    //     if(posicion.length == 1){
    //         response.json({state: false, mensaje: "Ya se encuentra un producto registrado con este código"})
    //         return false
    //     } else {
            console.log(prod.cantidad_pro, prod.nombre_prod)
            productoModel.actulizarProd(prod, function(respuesta){
                response.json(respuesta)
            })
    //     }
    // })
}

productoController.eliminarProducto = function(request, response){
    var prod = {
        cod_prod: request.body.cod_prod
    }

    if (prod.cod_prod == null || prod.cod_prod == undefined || prod.cod_prod == "") {
        response.json({ state: false, mensaje: "El código del producto es necesario" })
        return false
    }

    productoModel.eliminar(prod, function(respuesta){
        response.json(respuesta)
        return false
    })
}

productoController.buscarId = function (request, response){
    var prod = {
        _id: request.body._id
    }

    if (prod._id== null || prod._id== undefined || prod._id== "") {
        response.json({ state: false, mensaje: "El _id del producto es necesario" })
        return false
    }

    productoModel.buscarId(prod, function (respuesta){
        response.json(respuesta)
        return false
    })
}


module.exports.productoController = productoController