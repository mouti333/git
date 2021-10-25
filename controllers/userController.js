const userModel = require('../models/UsersModel')//constante require le model qu'on a fait precedement
//('../models/userModel') on export le model d apres un champs 
const jwt = require('jsonwebtoken')
const randtoken = require("rand-token")
const bcrypt = require('bcrypt')
var nodemailer = require('nodemailer')
var refreshTokens = {}
module.exports = {
    createUser: function (req, res) {
        userModel.create({email:req.body.email,
            photo:req.file.filename,mdp:req.body.mdp,role:req.body.role
        },
             function (err, User) {
            console.log('okkkkkk')
            if (err) {
                console.log(err)
                res.json({ msg: 'error', statut: 500, data: null })

            } else {
                res.json({ msg: 'utilisateur ajouté', statut: 200, data: User })
            }
        })
    },
    getAllUsers: function (req, res) {
        userModel.find({}).populate('order').exec(function (err, User) {
            if (err) {
                res.json({ msg: 'error', statut: 500, data: null })
            } else {
                res.json({ msg: 'liste des utilisateurs', statut: 200, data: User })
            }
        })
    },
    getOneUser: function (req, res) {
        userModel.findById({_id:req.params.id},function(err, user){
            console.log("aaaa",user)

            if (err) {
                res.json({ msg: 'error', statut: 500, data: null })
            } else {
                res.json({ msg: 'Utilisateurs', statut: 200, data: user })
            }
        })
    },
    updateUserById: function (req, res) {
        userModel.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true }, function (err, User) {
            if (err) {
                res.json({ msg: 'error', statut: 500, data: null })
            } else {
                res.json({ msg: 'Done', statut: 200, data: User })
            }
        })
    },
    deleteUserById: function (req, res) {
        userModel.deleteOne({ _id: req.params.id }, req.body, function (err, User) {
            if (err) {
                res.json({ msg: 'error', statut: 500, data: null })
            } else {
                res.json({ msg: 'deleted', statut: 200, data: User })
            }
        })
    },

authenticate: function (req, res, next) {
        userModel.findOne({
            email: req.body.email,}).populate('role').exec (function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if(userInfo!=null){
                    console.log('mdp',userInfo.mdp)
                    console.log('userinfo',userInfo)

                if (bcrypt.compareSync(req.body.mdp, userInfo.mdp)) {
                    var refreshToken = randtoken.uid(256)
                    refreshTokens[refreshToken] = userInfo._id
                    console.log('cccc',refreshTokens[refreshToken])
                    const token = jwt.sign({
                        id: userInfo._id
                    }, req.app.get('secretKey'), {expiresIn: '1h'});
                    res.json({
                        status: "success",
                        message: "user found!!!",
                        data: {
                            user: userInfo,
                            accesstoken: token,
                            refreshToken: refreshToken,
                            role:userInfo.role
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
            var token = jwt.sign(user, req.app.get('secretKey'), { expiresIn: '1h' })
            res.json({ accesstoken: token })
        }
        else {
            res.send(401)
        }
    },

    LogOut: function (req, res, next) {
        var refreshToken = req.body.refreshToken
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'))
        if (refreshToken in refreshTokens) {
            delete refreshTokens[refreshToken]
        }
        res.json({ msg: 'token experied', status: 204 })
    },
    sendemail: function (req, res, next) {
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "24201e34956ff7", //example of generated by Mailtrap 
                pass: "7106837c4c7c9a" //example of generated by Mailtrap 
            },
        });
        var mailOptions = {
            from: req.body.from,
            to: req.body.to,

            subject: req.body.subject,
            text: req.body.text



        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    }

}
