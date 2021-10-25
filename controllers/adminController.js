 const adminModel = require('../models/adminModel')
const  FeedbackModel=require('../models/FeedbackModel')

module.exports = {


Createadmin: function (req, res){
        adminModel.create({email:req.body.email,photo:req.file.filename,
            mdp:req.body.mdp}, 
             function (err, admin) {
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'admin ajouté', statut: 200, data: admin })
            }
    })
},

getAlladmin: function (req, res) {
    adminModel.find({},function (err, admin) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data: null })
        } else {
            res.json({ msg: 'liste des admins', statut: 200, data: admin })
        }
    })
},
getOneadmin: function (req, res){
    adminModel.findOne({_id:req.params.id},function(err, admin) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' admins ', statut :200, data:admin})
        }
    })
    },
deleteOneadmin: function (req, res){
        adminModel.deleteOne({id:req.params.id},function(err, admin) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:'admins ', statut :200, data:admin})
        }
    })
},
updateadminById: function (req,res){
    adminModel.findByIdAndUpdate({_id:req.params.id}, 
        req.body, { new: true, runValidators: true },
        function(err, admin) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' admins ', statut :200, data:admin})
        }
    })
},
getAllFeedback: function (req, res) {
    FeedbackModel.find({}).populate('Feedback').exec(function (err, Feedback) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data:null })
        } else {
            res.json({ msg: 'liste des Feedbacks', statut: 200, data:Feedback })
        }
    })

},
getOneFeedback: function (req, res){
    FeedbackModel.findOne({_id:req.params.id}).populate('Feedback').exec(function(err, Feedback) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Feedbacks ', statut :200, data:Feedback})
        }
    })
    },
}