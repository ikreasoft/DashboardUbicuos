var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var User = require("../models/User.js");
var Role = require("../models/Role.js");
var { verificarToken } = require("../auxiliar/seguridad.js");
var { auditar } = require("../auxiliar/auditoria.js");
var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

var db = mongoose.connection;
// Only for admin users
router.get("/",verificarToken, function (req, res) {
    console.log(req.headers);
    console.log("GET /users");
    User.find().then(function (users) {
        res.status(200).json(users)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/", function (req, res, next) {
    User.create(req.body, function (err, userinfo) {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

router.post("/signin", 
    function (req, res, next) {
        //debug("login");
            User.findOne({
                username: req.body.username
            }, function (err, user) {
                if (err) { //error al consultar la BBDD
                    res.status(500).send("¡Error comprobando el usuario!");
                }
                if (user != null) { //El usuario existe (ahora a ver si coincide el password)
                    //debug("El usuario existe");
                    user.comparePassword(req.body.password, 
                         function (err, isMatch) {
                              if (err) res.status(500).send("¡Error comprobando el password!");
                              if (isMatch){  
                                    next(); //pasamos a generar el token
                              }else
                                    res.status(401).send({
                                       message: "Password no coincide"
                              });    
                        }
                    );
                }
                else { //El usuario NO existe en la base de datos
                    res.status(401).send({
                        message: "Usuario no existe"
                    });
                }
            });
    },
    function (req, res, next) {
        jwt.sign({username: req.body.username},process.env.TOKEN_SECRET, {expiresIn: 24*3600 // expira en 1 día...
        }, function(err, generatedToken) {
            if (err) res.status(500).send("¡Error generando token de autenticación");
            else {
                auditar(req.body.username, "Ha iniciado sesión");
                res.status(200).send({message: generatedToken});
        }
        });
    });

router.get("/:id",verificarToken, function (req, res) {
    User.findById(req.params.id).then(function (user) {
        res.status(200).json(user)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});



module.exports = router;