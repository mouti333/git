const clubModel =require('../models/clubModel')
const jwt = require('jsonwebtoken')
const randtoken = require("rand-token")
const bcrypt = require('bcrypt')
var nodemailer = require('nodemailer')
var refreshTokens = {}
module.exports = {


    Createclub: function (req, res) {
    clubModel.create({ nom_de_club:req.body.nom_de_club,
        activite:req.body.activite,email:req.body.email,
        mdp:req.body.mdp, photo:req.file.filename,role:req.body.role},
          function (err,club) {
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'clubs ajouté', statut: 200, data: club})
            }
    })
},

getAllclub: function (req, res) {
    clubModel.find({},function (err,club) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data: null })
        } else {
            res.json({ msg: 'liste des clubs', statut: 200, data:club })
        }
    })
},
getOneclub: function (req, res){
    clubModel.findOne({_id:req.params.id},function(err, club) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' club ', statut :200, data:club})
        }
    })
    },
 deleteOneclub: function (req, res){
    clubModel.deleteOne({id:req.params.id},function(err, club) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:'club ', statut :200, data:club})
        }
    })
},
updateclubById: function (req,res){
    clubModel.updateOne({_id:req.params.id}, 
        req.body, { new: true, runValidators: true },function(err,club) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' club', statut :200, data:club})
        }
    })
},
authenticate: function (req, res, next) {
    clubModel.findOne({email: req.body.email}, function (err, clubInfo) {
        if (err) {
            next(err);
        } else {
            if(clubInfo!=null){
                console.log('mdp',clubInfo.mdp)
                console.log('clubinfo',clubInfo)

            if (bcrypt.compareSync(req.body.mdp, clubInfo.mdp)) {
                var refreshToken = randtoken.uid(256)
                refreshTokens[refreshToken] = clubInfo._id
                console.log('cccc',refreshTokens[refreshToken])
                const token = jwt.sign({
                    id: clubInfo._id
                }, req.app.get('secretKey'), {expiresIn: '1h'});
                res.json({
                    status: "success",
                    message: "club found!!!",
                    data: {
                        club: clubInfo,
                        accesstoken: token,
                        refreshToken: refreshToken,
                        
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