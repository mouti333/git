const administrationModel = require('../models/administrationModel')
const jwt = require('jsonwebtoken')
const randtoken = require("rand-token")
const bcrypt = require('bcrypt')
var nodemailer = require('nodemailer')
var refreshTokens = {}
module.exports = {

Createadministration: function (req, res) {
        administrationModel.create({nom:req.body.nom,prenom:req.body.prenom,
            statut:req.body.statut,email:req.body.email,
            photo:req.file.filename,mdp:req.body.mdp},
             function (err, administration) {
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'administration ajouté', statut: 200, data: administration })
            }
    })
},

getAlladministration: function (req, res) {
administrationModel.find({},function(err, administration) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data: null })
        } else {
            res.json({ msg: 'liste des aministrations', statut: 200, data: administration })
        }
    })
},
getOneadministration: function (req, res){
    administrationModel.findOne({_id:req.params.id},function(err, administration) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' administrations ', statut :200, data:administration})
        }
    })
    },
deleteOneadministration: function (req, res){
        administrationModel.deleteOne({id:req.params.id},function(err, administration) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:'administrations ', statut :200, data:administration})
        }
    })
},
updateadministrationsById: function (req,res){
    administrationModel.findOneAndUpdate({_id:req.params.id},{
        nom:req.body.nom,prenom:req.body.prenom,
        statut:req.body.statut,email:req.body.email,
        photo:req.file.filename,mdp:req.body.mdp},
  
        { new: true, runValidators: true },
        function(err, administration) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' administrations ', statut :200, data:administration})
        }
    })
},
authenticate: function (req, res, next) {
    console.log('bonjour')
    administrationModel.findOne({
        email: req.body.email
    }, function (err, administrationInfo) {
        console.log('administ',administrationInfo)
        if (err) {
            next(err);
        } else {
            if(administrationInfo!=null){
                console.log('mdp',administrationInfo.mdp)
                console.log('administrationInfo',administrationInfo)

            if (bcrypt.compareSync(req.body.mdp, administrationInfo.mdp)) {
                var refreshToken = randtoken.uid(256)
                refreshTokens[refreshToken] = administrationInfo._id
                console.log('cccc',refreshTokens[refreshToken])
                const token = jwt.sign({
                    id: administrationInfo._id
                }, req.app.get('secretKey'), {expiresIn: '1h'});
                res.json({
                    status: "success",
                    message: "administration found!!!",
                    data: {
                        user: administrationInfo,
                        accesstoken: token,
                        refreshToken: refreshToken
                    }
                });
            } else {
                res.json({status: "error", message: "Invalid mdp!!!", data: null});
            }
        }
        else{
            res.json({status: "error", message: "Invalid email!!!", data: null});
        }
    }
    });
},
}