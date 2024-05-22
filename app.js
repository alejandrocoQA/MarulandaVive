const express = require('express')
global.app = express()
global.config = require('./config.js').config
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require("mongoose")
var cors = require('cors')
const { config } = require('./config.js')
// const { config } = require('./config.js')

app.all('*', function(req, res, next) {

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');
    next();

});

app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) {
            return callback(null, true)
        }
        if(config.listablanca.indexOf(origin) === -1){
            return callback("error de cors", false)
        }
        return callback(null, true)
    }
}))


var session = require('express-session')({
    secret: config.secretsession,
    resave:true,
    saveUninitialized:true,
    cookie: {path:'/', httpOnly:true, maxAge:config.tiemposession},
    name: config.namecookie,
})

app.use(session)


global.db = []
global.minuta = []

require("./rutas.js")
mongoose.connect("mongodb://127.0.0.1:27017/" + config.nombrebd,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((respuesta) => {
        console.log("Conexión correcta a Mongo")
    }).catch((error) =>{
        console.log(error)
    })

app.listen(config.puerto, () => {

    
    console.log("Proyecto final corriendo por el puerto " + config.puerto)

})