const studentModel = require('../models/studentModel')
const EventsModel=require('../models/EventsModel')
const jwt = require('jsonwebtoken')
const randtoken = require("rand-token")
const bcrypt = require('bcrypt')

const express =require('express')
const http = require('http')
const api= express()
var refreshTokens = {}
module.exports = {


Createstudent: function (req, res) {
        studentModel.create(
            {nom:req.body.nom,prenom:req.body.prenom,
            datedenaissance:req.body.datedenaissance,niveauEtude:req.body.niveauEtude,
          email:req.body.email,mdp:req.body.mdp,
            photo:req.file.filename,role:req.body.role}
             ,
             function (err, student) { 
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'student ajouté', statut: 200, data: student })
            }
    })
},

getAllstudent: function (req, res) {
    studentModel.find({},function (err, User) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data: null })
        } else {
            res.json({ msg: 'liste des utilisateurs', statut: 200, data: User })
        }
    })
},
getOnestudent: function (req, res){
    studentModel.findOne({_id:req.params.id},function(err, student) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' students ', statut :200, data:student})
        }
    })
    },
deleteOnestudent: function (req, res){
        studentModel.deleteOne({_id:req.params.id},function(err, student) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:'students ', statut :200, data:student})
        }
    })
},
updatestudentsById: function (req,res){
    studentModel.findByIdAndUpdate({_id:req.params.id},{nom:req.body.nom,prenom:req.body.prenom,
        datedenaissance:req.body.datedenaissance,niveauEtude:req.body.niveauEtude,
          email:req.body.email,mdp:req.body.mdp,
            photo:req.file.filename }, { new: true, runValidators: true },
        function(err, student) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' students ', statut :200, data:student})
        }
    })
},
getAllEvents: function (req, res){
    EventsModel.find({}).populate('Events').exec(
    function(err,Events) {
        if (err) {
            res.json({msg:'error', statut:500, data:null})
        } else{
            res.json({msg:'Liste des Events ', statut :200, ddta:Events})
        }
    }
    )},
getOneEvents: function (req, res){
    EventsModel.findOne({_id:req.params.id}.populate('Events').exec(function(err, Events) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Events ', statut :200, data:Events})
        }
    })
    )},
     authenticate: function (req, res, next) {
        studentModel.findOne({
            email: req.body.email
        }, function (err, studentInfo) {
            if (err) {
                next(err);
            } else {
                if(studentInfo!=null){
                    console.log('mdp',studentInfo.mdp)
                    console.log('studentInfo',studentInfo)

                if (bcrypt.compareSync(req.body.mdp, studentInfo.mdp)) {
                    var refreshToken = randtoken.uid(256)
                    refreshTokens[refreshToken] = studentInfo._id
                    console.log('cccc',refreshTokens[refreshToken])
                    const token = jwt.sign({
                        id: studentInfo._id
                    }, req.app.get('secretKey'), {expiresIn: '1h'});
                    res.json({
                        status: "success",
                        message: "student found!!!",
                        data: {
                            user: studentInfo,
                            accesstoken: token,
                            refreshToken: refres8hToken
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
    refreshTok: function (req, res, next) {
        console.log('refreshing')
        var id = req.body.id
        console.log('id', req.body.id)
        var refreshToken = req.body.refreshToken
        console.log('refresh', refreshToken = req.body.refreshToken)
        console.log('test', (refreshTokens))
        console.log('test2', (refreshToken in refreshTokens))

        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)) {
            console.log("aaaaa", refreshToken)
            var user = {
                'id': id
            }
            var token = jwt.sign(user, req.app.get('secretKey'),{ expiresIn: '1h' })
            res.json({ token:'JWT'+ token })
            console.log('access token === ',token)
        }
        else {
            res.sendStatus(401)
        }
    },
}