const FeedbackModel = require('../models/FeedbackModel')

module.exports = {


CreateFeedback: function (req, res) {
        FeedbackModel.create({feedback:req.body.feedback,student:req.body.student},
            function (err,feedback) {
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'Feedback ajouté', statut: 200, data: feedback})
            }
    })
},

getAllFeedback: function (req, res) {
    FeedbackModel.find({},
        function (err, Feedback) {
        if (err) {
            res.json({ msg: 'error', statut: 500, data:null })
        } else {
            res.json({ msg: 'liste des Feedbacks', statut: 200, data:Feedback })
        }
    })

},
getOneFeedback: function (req, res){
    FeedbackModel.findOne({_id:req.params.id},function(err, Feedback) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Feedbacks ', statut :200, data:Feedback})
        }
    })
    },
deleteOneFeedbacks: function (req, res){
        FeedbackModel.deleteOne({id:req.params.id},function(err, Feedback) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Feedbacks ', statut :200, data:Feedback})
        }
    })
},
updateFeedbackById: function (req,res){
    FeedbackModel.updateOne({_id:req.params.id},req.body,function(err, Feedback) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Feedbacks ', statut :200, data:Feedback})
        }
    })
},
}
