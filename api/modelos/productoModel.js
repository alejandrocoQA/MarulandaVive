var productoModel = {}

const { response } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productoSchema = new Schema({
    nombre_prod: String,
    cod_prod:String,
    cantidad_pro:Number,
    estado:Number,
    
})

const Mydatabase = mongoose.model("Productos", productoSchema)

productoModel.guardar = function (payload, callback){

    const instancia = new Mydatabase

    instancia.nombre_prod = payload.nombre_prod
    instancia.cod_prod = payload.cod_prod
    instancia.cantidad_pro = payload.cantidad_pro
    instancia.estado = 1 

    instancia.save().then((respuesta) => {
        return callback({ state: true, mensaje: "Producto alamcenado correctamente" })
    }).catch((error) => {
        return callback({state: true, mensaje: error})
    })
}

productoModel.buscar = function ( payload, callback){
    Mydatabase.find({cod_prod: payload.cod_prod}).then((posicion) => {
        return callback (posicion)
    })
}

productoModel.buscarId = function ( payload, callback){
    Mydatabase.find({_id: payload._id}).then((posicion) => {
        return callback (posicion)
    })
}

productoModel.listar = function ( payload, callback){
    Mydatabase.find({},{}).then((respuesta) => {
        return callback({state: true, mensaje: respuesta})
    }).catch((error) => {
        return callback({state: false, mensaje: error})
    })
}

productoModel.listarActivos = function(payload, callback){
    Mydatabase.find({estado: 1},{}).then((res) => {
        return callback({state: true, datos: res})
    }).catch((error) => {
        return callback({state:false, mensaje:error})
    })
}

productoModel.actulizarProd = function (payload, callback){
    Mydatabase.findOneAndUpdate({cod_prod: payload.cod_prod},
        {
            nombre_prod: payload.nombre_prod,
            cantidad_pro: payload.cantidad_pro,
            cod_prod: payload.cod_prod,
            estado:payload.estado
            
           
        }).then((respuesta) => {
            return callback ({state: true, mensaje: "Actualización realizada"})
        })
}

productoModel.eliminar = function (payload, callback){
    Mydatabase.findOneAndDelete({cod_prod: payload.cod_prod}).then((respuesta) => {
        return callback({state: true, mensaje: "Producto eliminado"})
    })
}

module.exports.productoModel = productoModel