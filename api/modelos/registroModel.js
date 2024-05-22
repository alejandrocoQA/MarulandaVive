
var registroModel = {}

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var registroSchema = new Schema({
    nombres:String,
    cedula:Number,
    celular:Number,
    email:String,
    clave:String,
    direccion:String,
    rol: String,
    state: Number,
    nuevaclave:String
})

const Mydatabase = mongoose.model("personal_inscrito", registroSchema)


registroModel.guardar = function (payload, callback) {

    const instancia = new Mydatabase

    instancia.nombres = payload.nombres
    instancia.cedula = payload.cedula
    instancia.celular = payload.celular
    instancia.email = payload.email
    instancia.clave = payload.clave
    instancia.direccion = payload.direccion
    instancia.rol = 1  //1 cliente - 2 administrador
    instancia.estado = 0
    instancia.nuevaclave = payload.nuevaclave
    

    instancia.save().then((respuesta) => {
        return callback({ state: true, mensaje: "registro realizado" })
    }).catch((error) => {
        return callback({state: true, mensaje: error})
    })
}

registroModel.listar = function (payload, callback) {
    Mydatabase.find({},{clave:0}).then((respuesta) => {
        return callback({state: true, mensaje: respuesta})
    }).catch((error) => {
        return callback({state: false, mensaje: error})
    })
}

registroModel.busquedaCredenciales = function (payload, callback) {
    Mydatabase.find({$and: [{cedula:payload.cedula},{clave: payload.clave}]}).then((res) => {
        return callback(res)
    })
}

registroModel.buscar = function (payload, callback) { 
    Mydatabase.find({$or: [{cedula:payload.cedula},{email: payload.email}]}).then((res) => {
        return callback(res)
    })
}

registroModel.minuta = function (payload, callback) {
    minuta.push({ fechaHora: new Date, usuario: payload.cedula })
    return callback({ state: true })
}

registroModel.login = function (payload, callback) {
    Mydatabase.find({cedula: payload.cedula, clave: payload.clave},{nombres: 1, rol: 1}).then((res) => {
        return callback(res)
    })
    
}

registroModel.actualizarPassword = function (payload, callback) {

    Mydatabase.findOneAndUpdate({_id: payload._id},
        {
            clave:payload.nuevaclave
        }).then((res) => {
            console.log(res)
            return callback({ state: true, mensaje: "Contraseña actualizada" })
        }) 
}

registroModel.buscarUsuario = function _(payload, callback) {
    Mydatabase.find({$and: [{cedula:payload.cedula},{clave: payload.clave}]}).then((res) => {
        return callback(res)
    })
}

registroModel.eliminarUsuario = function (payload, callback) {
    Mydatabase.findOneAndDelete({_id: payload._id}).then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: "Se eliminó correctamente" })
    })
}

registroModel.actualizarDatos = function (payload, callback) {

    Mydatabase.findOneAndUpdate({_id: payload._id},
        {
            celular:payload.celular,
            direccion: payload.direccion,
            nombres: payload.nombres,
            rol: payload.rol
        }).then((res) => {
            console.log(res)
            return callback({ state: true, mensaje: "Datos actualizados" })
        })
}

registroModel.buscarId = function (payload, callback) {
    Mydatabase.find({_id: payload._id}).then((posicion) => {
        return callback (posicion)
    })
}


module.exports.registroModel = registroModel