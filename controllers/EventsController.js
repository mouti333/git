const EventsModel = require('../models/EventsModel')

module.exports = {


CreateEvents: function (req, res) {
        EventsModel.create({nom:req.body.nom,place:req.body.place,date:req.body.date,
            club:req.body.club,administration:req.body.administration}, 
            function (err,Events) {
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'Events ajouté', statut: 200, data: Events})
            }
    })
},

getAllEvents: function (req, res){
    EventsModel.find({}),function(err,Events) {
        if (err) {
            res.json({msg:'error', statut:500, data:null})
        } else{
            res.json({msg:'Liste des Events ', statut :200, ddta:Events})
        }
    }
},
getOneEvents: function (req, res){
    EventsModel.findOne({_id:req.params.id},function(err, Events) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Events ', statut :200, data:Events})
        }
    })
    },
 deleteOneEvents: function (req, res){
        EventsModel.deleteOne({id:req.params.id},function(err, Events) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:'Events ', statut :200, data:Events})
        }
    })
},
updateEventsById: function (req,res){
    EventsModel.updateOne({_id:req.params.id},req.body,function(err,Events) {
        if (err) {
            res.json({msg:'error', statut:500, data: null})
        } else{
            res.json({msg:' Events', statut :200, data:Events})
        }
    })
},
}